import { ConnectOptions, Identity, Signer, signers } from '@hyperledger/fabric-gateway';

import * as grpc from '@grpc/grpc-js';
import * as crypto from 'crypto';
import { has } from 'lodash';


export async function newGrpcConnection(peerEndpoint: string, tlsRootCert: Buffer): Promise<grpc.Client> {
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {});
}

export async function newConnectOptions(
    client: grpc.Client,
    mspId: string,
    credentials: Uint8Array,
    privateKeyPem: string
): Promise<ConnectOptions> {
    return {
        client,
        identity: await newIdentity(mspId, credentials),
        signer: await newSigner(privateKeyPem),
        // Default timeouts for different gRPC calls
        evaluateOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        endorseOptions: () => {
            return { deadline: Date.now() + 15000 }; // 15 seconds
        },
        submitOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        commitStatusOptions: () => {
            return { deadline: Date.now() + 60000 }; // 1 minute
        },
    };
}

export async function newIdentity(mspId: string, credentials: Uint8Array): Promise<Identity> {

    return { mspId, credentials };
}

export async function newSigner(privateKeyPem: string): Promise<Signer> {
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

export async function getPublicKey(certificate: string): Promise<crypto.KeyObject> {
    const publicKey = crypto.createPublicKey({
        key: certificate,
        format: 'pem',
    });
    return publicKey;
}

export async function getPrivateKey(privateKeyString: string): Promise<crypto.KeyObject> {
    const privateKey = crypto.createPrivateKey({
        key: privateKeyString,
        format: 'pem',
    });
    return privateKey;
}

export async function digitallySignData(data: string, privateKey: crypto.KeyObject): Promise<string> {
    try {
        const sign = crypto.createSign('SHA256');
        sign.update(data);
        sign.end();

        // Sign the data and return the digital signature
        const digitalSignature = sign.sign(privateKey, 'base64');
        return digitalSignature;
    } catch (error) {
        throw new Error('Error signing data: ' + error.message);
    }
}

export async function verifyDigitalSignature(data: string, publicKey: crypto.KeyObject, signature: string): Promise<boolean> {
    try {
        const verify = crypto.createVerify('SHA256');
        verify.update(data);
        verify.end();

        let isDigitalSignatureValid = verify.verify(publicKey, signature, 'base64');
        return isDigitalSignatureValid;
    } catch (error) {
        throw new Error('Error verifying data: ' + error.message);
    }
}

// Generates a random id for each asset.
export async function generateRandomId(assetType: string): Promise<string> {
    const idLength = 26;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = assetType + '-';

    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
    }
    return randomId;
}


export async function encryptId(message: string, publicKey: crypto.KeyObject): Promise<string> {
    const encryptedBuffer = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    }, Buffer.from(message, 'utf8'));

    // Convert the encrypted binary data to a Base64-encoded string
    const encryptedMessage = encryptedBuffer.toString('base64');
    return encryptedMessage;
}


export async function decryptId(encryptedMessage: string, privateKey: crypto.KeyObject): Promise<string> {
    // Convert the Base64-encoded string back to a Buffer
    const encryptedBuffer = Buffer.from(encryptedMessage, 'base64');

    // Decrypt the Buffer using the private key
    const decryptedBuffer = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    }, encryptedBuffer);

    // Convert the decrypted binary data to a UTF-8 string
    const decryptedMessage = decryptedBuffer.toString('utf8');
    return decryptedMessage;
}
