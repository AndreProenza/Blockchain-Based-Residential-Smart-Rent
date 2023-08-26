import React from 'react';
import BackendEndpoint from './BackendEndpoint';
import BlockchainEndpoint from './BlockchainEndpoint';

class ProposalEndpoint extends React.Component {
    
    static baseEndpoint = BackendEndpoint.backendUrl + "api/proposal";

    static register = ProposalEndpoint.baseEndpoint + "/register";
    static allByTenantId = ProposalEndpoint.baseEndpoint + "/all/by/tenant/";
    static allByContractId = ProposalEndpoint.baseEndpoint + "/all/by/contract/";
    static getById = ProposalEndpoint.baseEndpoint + "/get/";
    static deleteById = ProposalEndpoint.baseEndpoint + "/delete/";
}

export default ProposalEndpoint;