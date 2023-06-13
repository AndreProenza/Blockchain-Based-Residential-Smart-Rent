import React from 'react';
import BackendEndpoint from './BackendEndpoint';

class ContractEndpoint extends React.Component {
    
    static baseEndpoint = BackendEndpoint.backendUrl + "api/contract";

    static register = ContractEndpoint.baseEndpoint + "/register";
    static all = ContractEndpoint.baseEndpoint + "/all";
    static getById = ContractEndpoint.baseEndpoint + "/get/";
    static updateById = ContractEndpoint.baseEndpoint + "/update/";
    static deleteById = ContractEndpoint.baseEndpoint + "/delete/";
}

export default ContractEndpoint;