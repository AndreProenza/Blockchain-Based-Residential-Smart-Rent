import { connect } from '@hyperledger/fabric-gateway';

import { User } from 'fabric-common';
import { promises as fs } from 'fs';
import * as _ from "lodash";
import type { AddressInfo } from "net";
import { Logger } from "tslog";
import * as yaml from "yaml";
import { checkConfig, config } from './config';
import { newConnectOptions, newGrpcConnection, getPublicKey, getPrivateKey, digitallySignData, verifyDigitalSignature, generateRandomId, encryptId, decryptId } from './utils';
import FabricCAServices = require("fabric-ca-client")
import express = require("express")
import GoogleUtils from './google/googleUtils';
import { Wallets } from 'fabric-network';
import { X509Identity } from 'fabric-network';

const log = new Logger({ name: "assets-api" })


async function main() {
    checkConfig()
    const networkConfig = yaml.parse(await fs.readFile(config.networkConfigPath, 'utf8'));
    const orgPeerNames = _.get(networkConfig, `organizations.${config.mspID}.peers`)
    if (!orgPeerNames) {
        throw new Error(`Organization ${config.mspID} doesn't have any peers`);
    }
    let peerUrl: string = "";
    let peerCACert: string = "";
    let idx = 0
    for (const peerName of orgPeerNames) {
        const peer = networkConfig.peers[peerName]
        const peerUrlKey = `url`
        const peerCACertKey = `tlsCACerts.pem`
        peerUrl = _.get(peer, peerUrlKey).replace("grpcs://", "")
        peerCACert = _.get(peer, peerCACertKey)
        idx++;
        if (idx >= 1) {
            break;
        }
    }
    if (!peerUrl || !peerCACert) {
        throw new Error(`Organization ${config.mspID} doesn't have any peers`);
    }
    const ca = networkConfig.certificateAuthorities[config.caName]
    if (!ca) {
        throw new Error(`Certificate authority ${config.caName} not found in network configuration`);
    }
    const caURL = ca.url;
    if (!caURL) {
        throw new Error(`Certificate authority ${config.caName} does not have a URL`);
    }

    const fabricCAServices = new FabricCAServices(caURL, {
        trustedRoots: [ca.tlsCACerts.pem[0]],
        verify: true,
    }, ca.caName)

    const identityService = fabricCAServices.newIdentityService()
    const registrarUserResponse = await fabricCAServices.enroll({
        enrollmentID: ca.registrar.enrollId,
        enrollmentSecret: ca.registrar.enrollSecret
    });

    const registrar = User.createUser(
        ca.registrar.enrollId,
        ca.registrar.enrollSecret,
        config.mspID,
        registrarUserResponse.certificate,
        registrarUserResponse.key.toBytes()
    );

    // Wallet
    const publicWallet = await Wallets.newFileSystemWallet('./src/wallets/public/');
    const userWallet = await Wallets.newFileSystemWallet('./src/wallets/user/');

    const adminUser = _.get(networkConfig, `organizations.${config.mspID}.users.${config.hlfUser}`)
    const userCertificate = _.get(adminUser, "cert.pem")
    const userKey = _.get(adminUser, "key.pem")
    if (!userCertificate || !userKey) {
        throw new Error(`User ${config.hlfUser} not found in network configuration`);
    }
    const grpcConn = await newGrpcConnection(peerUrl, Buffer.from(peerCACert))
    const connectOptions = await newConnectOptions(
        grpcConn,
        config.mspID,
        Buffer.from(userCertificate),
        userKey
    )
    const gateway = connect(connectOptions);
    const network = gateway.getNetwork(config.channelName);
    const contract = network.getContract(config.chaincodeName);
    const app = express();
    app.use(express.json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, username, password");
        next();
    });
    const users = {}
    app.use(async (req, res, next) => {

        (req as any).contract = contract
        try {
            log.info(Object.keys(users))
            const user = req.headers.username as string;

            if (user && users[user]) {
                log.info(`using user: ${user}`)

                const connectOptions = await newConnectOptions(
                    grpcConn,
                    config.mspID,
                    Buffer.from(users[user].certificate),
                    users[user].key,
                )
                const gateway = connect(connectOptions);
                const network = gateway.getNetwork(config.channelName);
                const contract = network.getContract(config.chaincodeName);
                (req as any).contract = contract
            }
            next()
        } catch (e) {
            log.error(e)
            next(e)
        }
    })
    app.post("/signup", async (req, res) => {

        const auth = req.headers.authorization as string;
        const username = req.headers.username as string;
        const password = req.headers.password as string;

        if (await GoogleUtils.isRequestAuthorized(auth)) {

            /* ----- TEST ----- */
            // await identityService.delete(username, registrar);
            // res.send('OK');
            /* ---------------- */

            let identityFound = null
            try {
                identityFound = await identityService.getOne(username, registrar)
            } catch (e) {
                log.info("Identity not found, registering", e)
            }
            if (identityFound) {
                res.status(400)
                res.send("Username already taken")
                return
            }
            try {
                // Register the user with the CA
                await fabricCAServices.register({
                    enrollmentID: username,
                    enrollmentSecret: password,
                    affiliation: '',
                    role: 'client',
                    attrs: [],
                    maxEnrollments: -1,
                }, registrar);

                // Enroll the user to get their certificate and private key
                const userCredential = await fabricCAServices.enroll({
                    enrollmentID: username,
                    enrollmentSecret: password,
                });

                // Create an identity object to store the user credentials.
                // This is done only one time on signup
                const privateIdentity: X509Identity = {
                    credentials: {
                        certificate: userCredential.certificate,
                        privateKey: userCredential.key.toBytes(),
                    },
                    mspId: config.mspID,
                    type: 'X.509',
                };

                const publicIdentity: X509Identity = {
                    credentials: {
                        certificate: userCredential.certificate,
                    },
                    mspId: config.mspID,
                    type: 'X.509',
                };
                
                // Store the user's identity in the userWallet
                await userWallet.put(username, privateIdentity);

                // Store the user's public identity in the publicWallet
                await publicWallet.put(username, publicIdentity);


                /* -------- DIGITAL SIGNATURE - DELETE WHEN ENCRYPTED ID IS FUNCTIONAL --------*/

                // Create a digital signature of the username plus the user private key
                const privateKey = await getPrivateKey(userCredential.key.toBytes());
                const digitalSignature = await digitallySignData(username, privateKey);

                try {
                    // Store the pair (username - digitalSignature) in the blockchain as an asset
                    const fcn = "CreateDigitalSignature";
                    const responseBuffer = await (req as any).contract.submitTransaction(fcn, ...([username, digitalSignature]));
                    let responseString = Buffer.from(responseBuffer).toString();
                    console.log("responseString: ", responseString);
                } catch (e) {
                    console.log("Error creating digital signature");
                    await identityService.delete(username, registrar);
                    await userWallet.remove(username);
                    await publicWallet.remove(username);
                    res.status(400)
                    res.send("Error creating digital signature")
                }

                /* ------------------------------------------------*/



                /* ------------------- NEW ENCRYPTED ID ----------------*/

                // const userDigitalCertificate = (await publicWallet.get(username)).credentials.certificate;
                // const publicKey = await getPublicKey(userCredential.certificate);

                // Create an encrypted Id of the username plus the user private key
                // console.log("publicKey: ", publicKey);
                // console.log("publicKey.type: ", publicKey.type);
                // console.log("publicKey.asymmetricKeyDetails: ", publicKey.asymmetricKeyDetails);
                // console.log("publicKey.asymmetricKeyType: ", publicKey.asymmetricKeyType);
                // console.log("publicKey.asymmetricKeySize: ", publicKey.asymmetricKeySize);
                // console.log("publicKey.symmetricKeySize: ", publicKey.symmetricKeySize);

                // const encryptedId = await encryptId(username, publicKey);
                
                // try {
                //     // Store the pair (username - encrypted id) in the blockchain as an asset
                //     const fcn = "CreateEncryptedId";
                //     const responseBuffer = await (req as any).contract.submitTransaction(fcn, ...([username, encryptedId]));
                //     let responseString = Buffer.from(responseBuffer).toString();
                //     console.log("responseString: ", responseString);
                // } catch (e) {
                //     console.log("Error creating encrypted id");
                //     await identityService.delete(username, registrar);
                //     await userWallet.remove(username);
                //     await publicWallet.remove(username);
                //     res.status(400)
                //     res.send("Error creating encrypted id")
                // }

                /* ------------------------------------------------*/

                res.send('OK');
            } catch (error) {
                console.error('Error during signup:', error);
                res.status(500).send('Error during signup');
            }
        }
        else {
            res.status(400);
            res.send(null);
        }
    })
    app.post("/login", async (req, res) => {

        const auth = req.headers.authorization as string;
        const username = req.headers.username as string;

        if (await GoogleUtils.isRequestAuthorized(auth)) {

            // Check if the user's identity exists in the user wallet
            const identity = await userWallet.get(username);

            if (!identity) {
                res.status(400);
                res.send('Username not found');
                return;
            }

            /* ------------------- NEW ENCRYPTED ID ----------------*/

            // const privateKey = await getPrivateKey(identity.credentials.privateKey);
            // const privateKey = identity.credentials.privateKey;


            // let encryptedId = "";
            // try {
            //     // Get the digital signature associated with a given userId
            //     const fcn = "ReadAsset";
            //     const assetType = "EncryptedId";
            //     const id = assetType + "-" + username;
            //     const responseBuffer = await (req as any).contract.evaluateTransaction(fcn, ...([id, assetType]));
            //     const responseString = Buffer.from(responseBuffer).toString();
            //     encryptedId = JSON.parse(responseString).encryptedId;
            // } catch (e) {
            //     res.status(400)
            //     res.send("Error reading encrypted id")
            // }

            // const decryptedId = await decryptId(username, privateKey);
            // if (decryptedId !== username) {
            //     res.status(400);
            //     res.send('Your decrypted id does not match your user id');
            //     return;
            // }

            /* ------------------------------------------------*/


            /* -------- DIGITAL SIGNATURE - DELETE WHEN ENCRYPTED ID IS FUNCTIONAL --------*/

            // Verify user digital signature
            const userDigitalCertificate = (await publicWallet.get(username)).credentials.certificate;
            const publicKey = await getPublicKey(userDigitalCertificate);

            let digitalSignature = "";
            try {
                // Get the digital signature associated with a given userId
                const fcn = "ReadAsset";
                const assetType = "DigitalSignature";
                const id = assetType + "-" + username;
                const responseBuffer = await (req as any).contract.evaluateTransaction(fcn, ...([id, assetType]));
                const responseString = Buffer.from(responseBuffer).toString();
                digitalSignature = JSON.parse(responseString).digitalSignature;
            } catch (e) {
                res.status(400)
                res.send("Error reading digital signature")
            }

            const isDigitalSignatureValid = await verifyDigitalSignature(username, publicKey, digitalSignature);
            if (!isDigitalSignatureValid) {
                res.status(400);
                res.send('Your private key was tampered with');
                return;
            }

            /* ------------------------------------------------*/

            users[username] = { certificate: identity.credentials.certificate, key: identity.credentials.privateKey };

            res.send('OK');
        }
        else {
            res.status(400);
            res.send(null);
        }
    })
    app.get("/ping", async (req, res) => {
        try {
            const responseBuffer = await (req as any).contract.evaluateTransaction("Ping");
            const responseString = Buffer.from(responseBuffer).toString();
            res.send(responseString);
        } catch (e) {
            res.status(400)
            res.send(e.details && e.details.length ? e.details : e.message);
        }
    })
    app.post("/test-evaluate", async (req, res) => {
        try {
            const fcn = req.body.fcn
            const responseBuffer = await (req as any).contract.evaluateTransaction(fcn, ...(req.body.args || []));
            let responseString = Buffer.from(responseBuffer).toString();
            res.send(responseString);
        } catch (e) {
            res.status(400)
            res.send(e.details && e.details.length ? e.details : e.message);
        }
    })
    app.post("/test-submit", async (req, res) => {
        try {
            const username = "107709419344541253411";
            const fcn = req.body.fcn

            let id = "";
            let responseBuffer = null;
            let responseString = "";
            const fcnExists = "AssetExists";

            if (fcn === "CreateDigitalSignature" || fcn === "CreateEncryptedId") {
                responseBuffer = await (req as any).contract.submitTransaction(fcn, ...(req.body.args || []));
                responseString = Buffer.from(responseBuffer).toString();
                res.send(responseString);
                return;
            }

            if (fcn.startsWith("Create")) {
                id = await generateRandomId(fcn.substring("Create".length));

                responseBuffer = await (req as any).contract.evaluateTransaction(fcnExists, ...([id]));
                responseString = JSON.parse(Buffer.from(responseBuffer).toString());

                while (responseString) {
                    id = await generateRandomId(fcn.substring("Create".length));
                    responseBuffer = await (req as any).contract.evaluateTransaction(fcnExists, ...([id]));
                    responseString = JSON.parse(Buffer.from(responseBuffer).toString());
                }
                req.body.args.unshift(id);
            }
            else if (fcn === "UpdateContractAsset") {
                id = await generateRandomId("RentalInfo");

                responseBuffer = await (req as any).contract.evaluateTransaction(fcnExists, ...([id]));
                responseString = JSON.parse(Buffer.from(responseBuffer).toString());
                while (responseString) {
                    id = await generateRandomId("RentalInfo");
                    responseBuffer = await (req as any).contract.evaluateTransaction(fcnExists, ...([id]));
                    responseString = JSON.parse(Buffer.from(responseBuffer).toString());
                }
                req.body.args.push(id);
            }

            if (fcn !== "DeleteAllAssets") {
                req.body.args.unshift(username);
            }

            responseBuffer = await (req as any).contract.submitTransaction(fcn, ...(req.body.args || []));
            responseString = Buffer.from(responseBuffer).toString();
            res.send(responseString);
        } catch (e) {
            res.status(400)
            res.send(e.details && e.details.length ? e.details : e.message);
        }
    })
    app.post("/evaluate", async (req, res) => {
        try {
            const auth = req.headers.authorization as string;
            const fcn = req.body.fcn
            if (await GoogleUtils.isRequestAuthorized(auth)) {
                const responseBuffer = await (req as any).contract.evaluateTransaction(fcn, ...(req.body.args || []));
                let responseString = Buffer.from(responseBuffer).toString();
                res.send(responseString);
            }
            else {
                res.status(400);
                res.send(null);
            }
        } catch (e) {
            res.status(400)
            res.send(e.details && e.details.length ? e.details : e.message);
        }
    })
    app.post("/submit", async (req, res) => {
        try {
            const auth = req.headers.authorization as string;
            const username = req.headers.username as string;

            const fcn = req.body.fcn;

            let id = "";
            let responseBuffer = null;
            let responseString = "";
            const fcnReadAsset = "ReadAsset";
            const fcnExistsAsset = "AssetExists";

            if (await GoogleUtils.isRequestAuthorized(auth)) {

                const identity = await userWallet.get(username);
                const privateKey = await getPrivateKey(identity.credentials.privateKey);

                /* ------------------- NEW ENCRYPTED ID ----------------*/

                // Check if the user's identity exists in the user wallet
                // const identity = await userWallet.get(username);
                // const privateKey = await getPrivateKey(identity.credentials.privateKey);
                // const privateKey = identity.credentials.privateKey;


                // let encryptedId = "";
                // try {
                //     // Get the digital signature associated with a given userId
                //     const assetType = "EncryptedId";
                //     const id = assetType + "-" + username;
                //     responseBuffer = await (req as any).contract.evaluateTransaction(fcnReadAsset, ...([id, assetType]));
                //     responseString = Buffer.from(responseBuffer).toString();
                //     encryptedId = JSON.parse(responseString).encryptedId;
                // } catch (e) {
                //     res.status(400)
                //     res.send("Error reading encrypted id")
                // }

                // const decryptedId = await decryptId(username, privateKey);
                // if (decryptedId !== username) {
                //     res.status(400);
                //     res.send('Your decrypted id does not match your user id');
                //     return;
                // }

                /* ------------------------------------------------*/


                /* -------- DIGITAL SIGNATURE - DELETE WHEN ENCRYPTED ID IS FUNCTIONAL --------*/

                // Verify user digital signature
                const userDigitalCertificate = (await publicWallet.get(username)).credentials.certificate;
                const publicKey = await getPublicKey(userDigitalCertificate);

                let digitalSignature = "";
                try {
                    // Get the digital signature associated with a given userId
                    const assetType = "DigitalSignature";
                    id = assetType + "-" + username;
                    responseBuffer = await (req as any).contract.evaluateTransaction(fcnReadAsset, ...([id, assetType]));
                    responseString = Buffer.from(responseBuffer).toString();
                    digitalSignature = JSON.parse(responseString).digitalSignature;
                } catch (e) {
                    res.status(400)
                    res.send("Error reading digital signature")
                }

                const isDigitalSignatureValid = await verifyDigitalSignature(username, publicKey, digitalSignature);
                if (!isDigitalSignatureValid) {
                    res.status(400);
                    res.send('Your private key was tampered with');
                    return;
                }

                /* ------------------------------------------------*/                

                if (fcn.startsWith("Create")) {
                    id = await generateRandomId(fcn.substring("Create".length));

                    responseBuffer = await (req as any).contract.evaluateTransaction(fcnExistsAsset, ...([id]));
                    responseString = JSON.parse(Buffer.from(responseBuffer).toString());

                    while (responseString) {
                        id = await generateRandomId(fcn.substring("Create".length));
                        responseBuffer = await (req as any).contract.evaluateTransaction(fcnExistsAsset, ...([id]));
                        responseString = JSON.parse(Buffer.from(responseBuffer).toString());
                    }
                    req.body.args.unshift(id);                    
                }
                else if (fcn === "UpdateContractAsset") {
                    id = await generateRandomId("RentalInfo");

                    responseBuffer = await (req as any).contract.evaluateTransaction(fcnExistsAsset, ...([id]));
                    responseString = JSON.parse(Buffer.from(responseBuffer).toString());
                    while (responseString) {
                        id = await generateRandomId("RentalInfo");
                        responseBuffer = await (req as any).contract.evaluateTransaction(fcnExistsAsset, ...([id]));
                        responseString = JSON.parse(Buffer.from(responseBuffer).toString());
                    }
                    req.body.args.push(id);
                }

                // Compute digital signatures for the contracts
                if (fcn === "UpdateContractAsset" || fcn === "CreateProposal") {
                    // get contract details and proposal value and Sign contract digitally 

                    let contractAsset = null;
                    try {
                        // Get the contract asset by id
                        const assetType = "ContractAsset";
                        let contractId = "";
                        if (fcn === "CreateProposal") {
                            contractId = req.body.args[2];
                        }
                        else {
                            contractId = req.body.args[1];
                        }
                        responseBuffer = await (req as any).contract.evaluateTransaction(fcnReadAsset, ...([contractId, assetType]));
                        responseString = Buffer.from(responseBuffer).toString();
                        contractAsset = JSON.parse(responseString);
                    } catch (e) {
                        res.status(400)
                        res.send("Error reading contract asset");
                    }

                    // Get contract details
                    const contractId = contractAsset.id;
                    const propertyId = contractAsset.propertyId;
                    const term = contractAsset.term;
                    const initialDate = contractAsset.initialDate;
                    const finalDate = contractAsset.finalDate;
                    const conditions = contractAsset.conditions;
                    let price = 0;

                    let proposal = null;
                    if (fcn === "UpdateContractAsset") {                        
                        try {
                            // Get the proposal by id
                            const assetType = "Proposal";
                            const proposalId = req.body.args[1];
                            responseBuffer = await (req as any).contract.evaluateTransaction(fcnReadAsset, ...([proposalId, assetType]));
                            responseString = Buffer.from(responseBuffer).toString();
                            proposal = JSON.parse(responseString);
                            price = proposal.proposalPrice;
                        } catch (e) {
                            res.status(400)
                            res.send("Error reading proposal")
                        }
                    }
                    else {
                        price = req.body.args[4];
                    }

                    const contractDetailsCompactString = `${contractId}:${propertyId}:${term}:${initialDate}:${finalDate}:${conditions}:${price}`;
                    const contractDigitalSignature = await digitallySignData(contractDetailsCompactString, privateKey);
                    req.body.args.push(contractDigitalSignature);
                }
                req.body.args.unshift(username);

                responseBuffer = await (req as any).contract.submitTransaction(fcn, ...(req.body.args || []));
                responseString = Buffer.from(responseBuffer).toString();
                res.send(responseString);
            }
            else {
                res.status(400);
                res.send(null);
            }
        } catch (e) {
            res.status(400)
            res.send(e.details && e.details.length ? e.details : e.message);
        }
    })

    const server = app.listen(
        {
            port: process.env.PORT || 3003,
            host: process.env.HOST || "0.0.0.0",
        },
        () => {
            const addressInfo: AddressInfo = server.address() as AddressInfo;
            console.log(`
        Server is running!
        Listening on ${addressInfo.address}:${addressInfo.port}
      `);
        }
    );

}


main()