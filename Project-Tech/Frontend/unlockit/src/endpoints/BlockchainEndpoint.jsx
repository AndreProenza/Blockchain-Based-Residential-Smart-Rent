import React from 'react';

class BlockchainEndpoint extends React.Component {

    static blockchainOrg1ServerUrl = "http://localhost:3003/";
    static blockchainOrg2ServerUrl = "http://localhost:3004/";
    
    // Org1 endpoints
    static signupBlockchainOrg1ServerUrl = BlockchainEndpoint.blockchainOrg1ServerUrl + "signup";
    static loginBlockchainOrg1ServerUrl = BlockchainEndpoint.blockchainOrg1ServerUrl + "login";
    static evaluateBlockchainOrg1ServerUrl = BlockchainEndpoint.blockchainOrg1ServerUrl + "evaluate";
    static submitBlockchainOrg1ServerUrl = BlockchainEndpoint.blockchainOrg1ServerUrl + "submit";
    // Org2 endpoints
    static signupBlockchainOrg2ServerUrl = BlockchainEndpoint.blockchainOrg2ServerUrl + "signup";
    static loginBlockchainOrg2ServerUrl = BlockchainEndpoint.blockchainOrg2ServerUrl + "login";
    static evaluateBlockchainOrg2ServerUrl = BlockchainEndpoint.blockchainOrg2ServerUrl + "evaluate";
    static submitBlockchainOrg2ServerUrl = BlockchainEndpoint.blockchainOrg2ServerUrl + "submit";
    // Asset Functions
    static getAllAssetsFunction = "GetAllAssets";
    static createAssetFunction = "CreateAsset";
    static updateAssetFunction = "UpdateAsset";
    static deleteAssetFunction = "DeleteAsset";

    // Unlockit Smart Contract Functions

    // General Functions
    static readAssetFunction = "ReadAsset";
    static getAllAssetsByAssetTypeFunction = "GetAllAssetsByAssetType";
    static assetExistsFunction = "AssetExists";
    // Property Functions
    static createPropertyAssetFunction = "CreatePropertyAsset";
    static updatePropertyAssetFunction = "UpdatePropertyAsset";
    static deletePropertyAssetFunction = "DeletePropertyAsset";
    static readAllPropertiesByLandlordIdFunction = "ReadAllPropertiesByLandlordId";
    static readPropertyActiveContractFunction = "ReadPropertyActiveContract";
    // Contract Functions
    static createContractAssetFunction = "CreateContractAsset";
    static updateContractAssetFunction = "UpdateContractAsset";
    static deleteContractAsset = "DeleteContractAsset";
    static readAllContractsByPropertyIdFunction = "ReadAllContractsByPropertyId";
    // Rental Info Functions
    static createRentalInfoFunction = "CreateRentalInfo";
    // Proposal Functions
    static createProposalFunction = "CreateProposal";
    static updateProposalFunction = "UpdateProposal";
    static deleteProposalFunction = "DeleteProposal";
    static readAllProposalsByContractIdFunction = "ReadAllProposalsByContractId";
}

export default BlockchainEndpoint;