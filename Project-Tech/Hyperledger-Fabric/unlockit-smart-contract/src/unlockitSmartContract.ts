/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';

import { PropertyAsset } from './model/propertyAsset';
import { ContractAsset } from './model/contractAsset';
import { RentalInfo } from './model/rentalInfo';
import { Proposal } from './model/proposal';
import { Payment } from './model/payment';
import { DigitalSignature } from './model/digitalSignature';
import { EncryptedId } from './model/encryptedId';

@Info({ title: 'Unlockit Smart contract', description: 'Unlockit Smart contract for renting residential properties' })
export class UnlockitSmartContract extends Contract {


    /* ------------------- Utils Functions ------------------- */

    private async getCurrentRealWorldDate(): Promise<Date> {

        const url = 'https://world-time2.p.rapidapi.com/ip';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fe197ed0a7mshe9b5eac8160b9b5p1b39edjsndfdf57d4d517',
                'X-RapidAPI-Host': 'world-time2.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            const currentLocalDate = new Date(result.datetime);
            return this.extractDate(currentLocalDate);
        } catch (error) {
            console.error('Error fetching current date:', error);
            return this.extractDate(new Date()); // Fallback to using local system date in case of an error
        }
    }

    private extractDateFromString(dateString: string): Date {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    private extractDate(date: Date): Date {
        const extractedDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        return extractedDate;
    }

    private async isOrgValid(ctx: Context): Promise<boolean> {
        return ctx.clientIdentity.getMSPID() === "Org1MSP";
    }

    /* --------------------------------------------------------- */



    /* ------------------- General Functions ------------------- */

    // ReadAsset returns the asset stored in the world state with given id as an JSON object.
    @Transaction(false)
    public async ReadAsset(ctx: Context, id: string, assetType: string): Promise<any> {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {

            switch (assetType) {
                case 'PropertyAsset':
                    throw new Error(`The Property Asset ${id} does not exist`);
                case 'ContractAsset':
                    throw new Error(`The Contract Asset ${id} does not exist`);
                case 'RentalInfo':
                    throw new Error(`The Rental Info ${id} does not exist`);
                case 'Proposal':
                    throw new Error(`The Proposal ${id} does not exist`);
                case 'Payment':
                    throw new Error(`The Payment ${id} does not exist`);
                case 'DigitalSignature':
                    throw new Error(`The DigitalSignature ${id} does not exist`);
                case 'EncryptedId':
                    throw new Error(`The EncryptedId ${id} does not exist`);
                default:
                    throw new Error(`The Asset ${id} does not exist`);
            }
        }
        return assetJSON.toString();
    }

    // readAssetAsObject returns the asset stored in the world state with given id as an object.
    @Transaction(false)
    private async readAssetAsObject(ctx: Context, id: string, assetType: string): Promise<any> {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {

            switch (assetType) {
                case 'PropertyAsset':
                    throw new Error(`The Property Asset ${id} does not exist`);
                case 'ContractAsset':
                    throw new Error(`The Contract Asset ${id} does not exist`);
                case 'RentalInfo':
                    throw new Error(`The Rental Info ${id} does not exist`);
                case 'Proposal':
                    throw new Error(`The Proposal ${id} does not exist`);
                case 'Payment':
                    throw new Error(`The Payment ${id} does not exist`);
                case 'DigitalSignature':
                    throw new Error(`The DigitalSignature ${id} does not exist`);
                case 'EncryptedId':
                    throw new Error(`The EncryptedId ${id} does not exist`);
                default:
                    throw new Error(`The Asset ${id} does not exist`);
            }
        }
        switch (assetType) {
            case 'PropertyAsset':
                return JSON.parse(assetJSON.toString()) as PropertyAsset;
            case 'ContractAsset':
                return JSON.parse(assetJSON.toString()) as ContractAsset;
            case 'RentalInfo':
                return JSON.parse(assetJSON.toString()) as RentalInfo;
            case 'Proposal':
                return JSON.parse(assetJSON.toString()) as Proposal;
            case 'Payment':
                return JSON.parse(assetJSON.toString()) as Payment;
            case 'DigitalSignature':
                return JSON.parse(assetJSON.toString()) as DigitalSignature;
            case 'EncryptedId':
                return JSON.parse(assetJSON.toString()) as EncryptedId;
        }
    }

    // GetAllAssets returns all assets of a given assetType found in the world state.
    @Transaction(false)
    @Returns('any[]')
    private async getAllAssetsByAssetTypeAsObject(ctx: Context, assetType: string): Promise<any[]> {
        const allResults: any[] = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record: any;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            let recordObject: any;
            if (record.id.split("-")[0] === assetType) {
                switch (assetType) {
                    case 'PropertyAsset':
                        recordObject = record as PropertyAsset;
                        break;
                    case 'ContractAsset':
                        recordObject = record as ContractAsset;
                        break;
                    case 'RentalInfo':
                        recordObject = record as RentalInfo;
                        break;
                    case 'Proposal':
                        recordObject = record as Proposal;
                        break;
                    case 'Payment':
                        recordObject = record as Payment;
                        break;
                    case 'DigitalSignature':
                        recordObject = record as DigitalSignature;
                        break;
                    case 'EncryptedId':
                        recordObject = record as EncryptedId;
                        break;
                    default:
                        recordObject = record;
                        break;
                }
                allResults.push(recordObject);
            }
            result = await iterator.next();
        }
        return allResults;
    }

    @Transaction(false)
    @Returns('string')
    public async GetAllAssetsByAssetType(ctx: Context, assetType: string): Promise<string> {
        return JSON.stringify(await this.getAllAssetsByAssetTypeAsObject(ctx, assetType));
    }

    // AssetExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async AssetExists(ctx: Context, id: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    @Transaction(false)
    @Returns('string')
    public async GetAllAssets(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    @Transaction()
    public async DeleteAllAssets(ctx: Context): Promise<void> {
        const allAssets = JSON.parse(await this.GetAllAssets(ctx));

        for (const asset of allAssets) {
            await ctx.stub.deleteState(asset.id);
        }
    }

    /* --------------------------------------------------------- */



    /* --------------------- PropertyAsset --------------------- */

    // Issues a new property asset to the world state with given details.
    @Transaction()
    public async CreatePropertyAsset(ctx: Context, userId: string, id: string, landlordId: string, address: string, location: string,
        type: string, area: number, description: string): Promise<string> {

        if (userId !== landlordId) {
            throw new Error(`You ${userId} are not the property landlord ${landlordId}`);
        }

        const propertyAsset = {
            id: id,
            landlordId: landlordId,
            address: address,
            location: location,
            type: type,
            area: area,
            description: description,
        };

        // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(propertyAsset))));
        return JSON.stringify(propertyAsset);
    }

    // Deletes a given property asset from the world state.
    @Transaction()
    public async DeletePropertyAsset(ctx: Context, userId: string, propertyId: string): Promise<void> {
        const exists = await this.AssetExists(ctx, propertyId);
        if (!exists) {
            throw new Error(`The Property ${propertyId} does not exist`);
        }
        const propertyAsset = await this.readAssetAsObject(ctx, propertyId, "PropertyAsset");

        if (!this.isOrgValid(ctx) || propertyAsset.landlordId !== userId) {
            throw new Error(`The Property ${propertyId} is not owned by ${userId}`);
        }
        return ctx.stub.deleteState(propertyId);
    }

    private async getAllPropertiesByLandlordId(ctx: Context, landlordId: string): Promise<PropertyAsset[]> {
        const properties = await this.getAllAssetsByAssetTypeAsObject(ctx, "PropertyAsset");

        const landlordIdProperties: PropertyAsset[] = properties.filter((property: PropertyAsset) => {
            return property.landlordId === landlordId;
        });
        return landlordIdProperties;
    }

    @Transaction(false)
    @Returns('string')
    public async ReadAllPropertiesByLandlordId(ctx: Context, landlordId: string): Promise<string> {
        return JSON.stringify(await this.getAllPropertiesByLandlordId(ctx, landlordId));
    }

    /* --------------------------------------------------------- */




    /* --------------------- ContractAsset --------------------- */

    // Issues a new contract asset to the world state with given details.
    @Transaction()
    public async CreateContractAsset(ctx: Context, userId: string, id: string, propertyId: string, term: string, initialDate: string,
        finalDate: string, price: number, conditions: string, landlordId: string): Promise<string> {

        if (userId !== landlordId) {
            throw new Error(`You ${userId} are not the property landlord ${landlordId}`);
        }

        const contractAsset = {
            id: id,
            propertyId: propertyId,
            term: term,
            initialDate: initialDate,
            finalDate: finalDate,
            price: price,
            conditions: conditions,
            landlordId: landlordId,
            tenantId: null,
            signed: false,
            landlordSignature: null,
            tenantSignature: null,
        };
        // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(contractAsset))));
        return JSON.stringify(contractAsset);
    }

    @Transaction()
    public async UpdateContractAsset(ctx: Context, userId: string, contractId: string, proposalId: string, rentalInfoId: string, landlordSignature: string): Promise<string> {
        const contractExists = await this.AssetExists(ctx, contractId);
        if (!contractExists) {
            throw new Error(`The Contract ${contractId} does not exist`);
        }
        const contractAsset = await this.readAssetAsObject(ctx, contractId, "ContractAsset");
        if (!this.isOrgValid(ctx) || contractAsset.landlordId !== userId) {
            throw new Error(`You are not the Landlord of this contract ${contractId}`);
        }

        // Verify if contract already has a tenant
        if (contractAsset.tenantId !== null) {
            throw new Error(`The Contract ${contractId} cannot be updated, since it already has a tenant ${contractAsset.tenantId}`);
        }
        else {
            //Verify if proposal exists
            const proposalExists = await this.AssetExists(ctx, proposalId);
            if (!proposalExists) {
                throw new Error(`The Proposal ${proposalId} does not exist`);
            }
            const proposal = await this.readAssetAsObject(ctx, proposalId, "Proposal");

            // overwriting original contract asset with new contract asset
            const updatedContractAsset = {
                id: contractAsset.id,
                propertyId: contractAsset.propertyId,
                term: contractAsset.term,
                initialDate: contractAsset.initialDate,
                finalDate: contractAsset.finalDate,
                price: proposal.price,
                conditions: contractAsset.conditions,
                landlordId: contractAsset.landlordId,
                tenantId: proposal.tenantId,
                signed: true,
                landlordSignature: landlordSignature,
                tenantSignature: proposal.tenantSignature,
            };

            // Get all proposals by contractId
            const proposals = await this.getAllProposalsByContractId(ctx, contractId);

            // Get the highest proposal value (price)
            const highestProposal = this.getHighestProposal(proposals);

            // Get the number of proposals for this contract id
            const numberOfProposals = proposals.length;

            // Create Rental Info
            await this.CreateRentalInfo(ctx, rentalInfoId, contractAsset.propertyId, contractAsset.term, contractAsset.initialDate,
                contractAsset.finalDate, highestProposal, numberOfProposals);

            // Confirm and update contract
            await ctx.stub.putState(contractId, Buffer.from(stringify(sortKeysRecursive(updatedContractAsset))));
            return JSON.stringify(updatedContractAsset);
        }
    }

    // Deletes a given property asset from the world state.
    @Transaction()
    public async DeleteContractAsset(ctx: Context, userId: string, contractId: string): Promise<void> {
        const exists = await this.AssetExists(ctx, contractId);
        if (!exists) {
            throw new Error(`The Contract ${contractId} does not exist`);
        }
        const contractAsset = await this.readAssetAsObject(ctx, contractId, "ContractAsset");

        if (!this.isOrgValid(ctx) || contractAsset.landlordId !== userId) {
            throw new Error(`You are not the Landlord of this contract ${contractId}`);
        }

        const currentDate = await this.getCurrentRealWorldDate();
        const contractFinalDate = this.extractDate(this.extractDateFromString(contractAsset.finalDate));

        // Delete contract if contract final date is expired. Date format: "yyyy-mm-dd"
        if (contractFinalDate >= currentDate) {
            throw new Error(`You cannot delete this contract ${contractId}, since it is still valid until ${contractAsset.finalDate}`);
        }
        else {
            await ctx.stub.deleteState(contractId);
        }
    }

    // Verifies if a given property asset from the world state is currently rented
    // Returns the a string representation of the "ContractAsset" if is currently rented and "null" if not
    @Transaction(false)
    public async ReadPropertyActiveContract(ctx: Context, propertyId: string): Promise<string> {
        let exists = await this.AssetExists(ctx, propertyId);
        if (!exists) {
            throw new Error(`The Property ${propertyId} does not exist`);
        }
        // Get all contracts by propertyid
        const contracts = await this.getAllContractsByPropertyId(ctx, propertyId);

        // Get the contract (if exists) with propertyId and valid date
        const activeContract = await this.getActiveContract(contracts);
        return JSON.stringify(activeContract);
    }

    private async getActiveContract(contracts: ContractAsset[]): Promise<ContractAsset | null> {
        const currentDate = await this.getCurrentRealWorldDate();

        // Get active contract if exists one active.
        const activeContracts: ContractAsset[] = contracts.filter((contract: ContractAsset) => {
            let contractFinalDate = this.extractDate(this.extractDateFromString(contract.finalDate));
            return contractFinalDate >= currentDate;
        });

        return activeContracts.length > 0 ? activeContracts[0] : null;
    }

    private async getAllContractsByPropertyId(ctx: Context, propertyId: string): Promise<ContractAsset[]> {
        const contracts = await this.getAllAssetsByAssetTypeAsObject(ctx, "ContractAsset");

        const propertyIdContracts: ContractAsset[] = contracts.filter((contract: ContractAsset) => {
            return contract.propertyId === propertyId;
        });
        return propertyIdContracts;
    }

    @Transaction(false)
    @Returns('string')
    public async ReadAllContractsByPropertyId(ctx: Context, propertyId: string): Promise<string> {
        return JSON.stringify(await this.getAllContractsByPropertyId(ctx, propertyId));
    }

    /* --------------------------------------------------------- */



    /* ---------------------- RentalInfo ----------------------- */

    // Issues a new rental info to the world state with given details.
    @Transaction()
    private async CreateRentalInfo(ctx: Context, id: string, propertyId: string, term: string, initialDate: string,
        finalDate: string, highestProposal: number, numberOfProposals: number): Promise<void> {

        const rentalInfo = {
            id: id,
            propertyId: propertyId,
            term: term,
            initialDate: initialDate,
            finalDate: finalDate,
            highestProposal: highestProposal,
            numberOfProposals: numberOfProposals,
        };
        // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(rentalInfo))));
    }

    /* --------------------------------------------------------- */



    /* ----------------------- Proposal ------------------------ */

    // Issues a new proposal to the world state with given details.
    @Transaction()
    public async CreateProposal(ctx: Context, userId: string, id: string, tenantId: string, contractId: string,
        originalPrice: number, proposalPrice: number, tenantSignature: string): Promise<string> {

        if (userId !== tenantId) {
            throw new Error(`You ${userId} are not the proposal tenant ${tenantId}`);
        }

        let exists = await this.AssetExists(ctx, contractId);
        if (!exists) {
            throw new Error(`The Contract ${contractId} does not exists`);
        }

        const proposal = {
            id: id,
            tenantId: tenantId,
            tenantSignature: tenantSignature,
            contractId: contractId,
            originalPrice: originalPrice,
            proposalPrice: proposalPrice,
            active: true,
            status: "awaiting",
        };
        // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(proposal))));
        return JSON.stringify(proposal);
    }

    // Updates an existing proposal in the world state with provided parameters.
    @Transaction()
    public async UpdateProposal(ctx: Context, userId: string, id: string, status: string): Promise<string> {

        if (status !== "rejected" && status !== "accepted") {
            throw new Error(`The Proposal ${status} does not exist`);
        }
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The Proposal ${id} does not exist`);
        }
        const proposal = await this.readAssetAsObject(ctx, id, "Proposal");

        const contractExists = await this.AssetExists(ctx, proposal.contractId);
        if (!contractExists) {
            throw new Error(`The Proposal ${proposal.id} cannot be updated since the Contract ${proposal.contractId} does not exist`);
        }
        const contractAsset = await this.readAssetAsObject(ctx, proposal.contractId, "ContractAsset");
        if (!this.isOrgValid(ctx) || contractAsset.landlordId !== userId) {
            throw new Error(`The Proposal ${proposal.id} cannot be updated since you are not the landlord of the property for which this proposal is intended`);
        }
        // overwriting original proposal with new proposal
        const updatedProposal = {
            id: proposal.id,
            tenantId: proposal.tenantId,
            tenantSignature: proposal.tenantSignature,
            contractId: proposal.contractId,
            originalPrice: proposal.originalPrice,
            proposalPrice: proposal.proposalPrice,
            status: status,
            active: false,
        };
        // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedProposal))));
        return JSON.stringify(updatedProposal);
    }

    // Deletes a given proposal from the world state.
    @Transaction()
    public async DeleteProposal(ctx: Context, userId: string, proposalId: string): Promise<void> {
        const exists = await this.AssetExists(ctx, proposalId);
        if (!exists) {
            throw new Error(`The Proposal ${proposalId} does not exist`);
        }
        const proposal = await this.readAssetAsObject(ctx, proposalId, "Proposal");

        if (!this.isOrgValid(ctx) || proposal.tenantId !== userId) {
            throw new Error(`The Proposal ${proposalId} was not proposed by ${userId}`);
        }
        return ctx.stub.deleteState(proposalId);
    }

    private async getAllProposalsByContractId(ctx: Context, contractId: string): Promise<Proposal[]> {
        const proposals = await this.getAllAssetsByAssetTypeAsObject(ctx, "Proposal");

        const contractIdProposals: Proposal[] = proposals.filter((proposal: Proposal) => {
            return proposal.contractId === contractId;
        });
        return contractIdProposals;
    }

    @Transaction(false)
    @Returns('string')
    public async ReadAllProposalsByContractId(ctx: Context, contractId: string): Promise<string> {
        return JSON.stringify(await this.getAllProposalsByContractId(ctx, contractId));
    }

    private getHighestProposal(proposals: Proposal[]): number {
        let highestProposal = 0;
        for (const proposal of proposals) {
            if (proposal.proposalPrice > highestProposal) {
                highestProposal = proposal.proposalPrice;
            }
        }
        return highestProposal;
    }

    /* --------------------------------------------------------- */


    /* --------------------- Payment --------------------- */

    // Issues a new payment record to the world state with given details.
    @Transaction()
    public async CreatePayment(ctx: Context, userId: string, id: string, contractId: string, amount: number, landlordAccount: string,
        tenantAccount: string, expirationTime: string, firstPaymentStatus: string): Promise<string> {

        const exists = await this.AssetExists(ctx, contractId);
        if (!exists) {
            throw new Error(`The Contract ${contractId} does not exist`);
        }
        const contractAsset = await this.readAssetAsObject(ctx, contractId, "ContractAsset");

        if (!this.isOrgValid(ctx) || contractAsset.landlordId !== userId) {
            throw new Error(`The Contract ${contractId} is not owned by ${userId}`);
        }
        
        // Calculate date
        const finalPaymentDate = "";

        //Calculate number of payment status
        const nextPaymentStatus = [];

        const payment = {
            id: id,
            contractId: contractId,
            amount: amount,
            landlordAccount: landlordAccount,
            tenantAccount: tenantAccount,
            expirationTime: expirationTime,
            firstPaymentStatus: firstPaymentStatus,
            nextPaymentStatus: nextPaymentStatus,
            finalPaymentDate: finalPaymentDate,
        };

        // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(payment))));
        return JSON.stringify(payment);
    }

    // Deletes a given payment record from the world state.
    @Transaction()
    public async DeletePayment(ctx: Context, userId: string, paymentId: string): Promise<void> {
        let exists = await this.AssetExists(ctx, paymentId);
        if (!exists) {
            throw new Error(`The Payment ${paymentId} does not exist`);
        }
        const paymentAsset = await this.readAssetAsObject(ctx, paymentId, "Payment");

        const contractId = paymentAsset.contractId;
        exists = await this.AssetExists(ctx, contractId);
        if (!exists) {
            throw new Error(`The Contract ${contractId} does not exist`);
        }
        const contractAsset = await this.readAssetAsObject(ctx, contractId, "ContractAsset");

        if (!this.isOrgValid(ctx) || contractAsset.landlordId !== userId) {
            throw new Error(`The Payment ${paymentId} is not linked to the user ${userId} contract ${contractId}`);
        }
        return ctx.stub.deleteState(paymentId);
    }

    /* --------------------------------------------------------- */


    /* -------------------- EncryptedId----------------------- */

    // Issues a new encrypted id info to the world state with given details.
    @Transaction()
    public async CreateEncryptedId(ctx: Context, userId: string, encryptedId: string): Promise<string> {

        let id = "EncryptedId" + '-' + userId;
        let exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The user ${userId} already has an encrypted id`);
        }
        const encryptedIdAsset = {
            id: id,
            encryptedId: encryptedId,
        };
        // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(encryptedIdAsset))));
        return JSON.stringify(encryptedIdAsset);
    }

    // Deletes a given encrypted id asset from the world state.
    @Transaction()
    public async DeleteEncryptedId(ctx: Context, userId: string): Promise<void> {

        const exists = await this.AssetExists(ctx, userId);
        if (!exists) {
            throw new Error(`The User ${userId} does not have an encrypted id`);
        }
        const encryptedIdAsset = await this.readAssetAsObject(ctx, userId, "EncryptedId");

        if (!this.isOrgValid(ctx) || encryptedIdAsset.id !== userId) {
            throw new Error(`The Encrypted Id ${encryptedIdAsset.encryptedId} is not linked to ${userId}`);
        }
        return ctx.stub.deleteState(userId);
    }

    /* --------------------------------------------------------- */


    /* ---------------------- DigitalSignature ----------------------- */

    // Issues a new digital signature info to the world state with given details.
    @Transaction()
    public async CreateDigitalSignature(ctx: Context, userId: string, digitalSignature: string): Promise<string> {

        let id = "DigitalSignature" + '-' + userId;
        let exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The user ${userId} already has a digital signature`);
        }
        const digitalSignatureAsset = {
            id: id,
            digitalSignature: digitalSignature,
        };
        // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(digitalSignatureAsset))));
        return JSON.stringify(digitalSignatureAsset);
    }

    // Deletes a given digital signature asset from the world state.
    @Transaction()
    public async DeleteDigitalSignature(ctx: Context, userId: string): Promise<void> {

        const exists = await this.AssetExists(ctx, userId);
        if (!exists) {
            throw new Error(`The User ${userId} does not have a digital signature`);
        }
        const digitalSignatureAsset = await this.readAssetAsObject(ctx, userId, "DigitalSignature");

        if (!this.isOrgValid(ctx) || digitalSignatureAsset.id !== userId) {
            throw new Error(`The Digital Signature ${digitalSignatureAsset.digitalSignature} is not owned by ${userId}`);
        }
        return ctx.stub.deleteState(userId);
    }

    /* --------------------------------------------------------- */





}
