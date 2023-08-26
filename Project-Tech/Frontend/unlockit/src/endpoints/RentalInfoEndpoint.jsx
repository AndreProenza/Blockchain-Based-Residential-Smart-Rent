import React from 'react';
import BackendEndpoint from './BackendEndpoint';
import BlockchainEndpoint from './BlockchainEndpoint';

class RentalInfoEndpoint extends React.Component {
    
    static baseEndpoint = BackendEndpoint.backendUrl + "api/rental-info";

    static register = RentalInfoEndpoint.baseEndpoint + "/register";
    static allByPropertyId = RentalInfoEndpoint.baseEndpoint + "/all/by/property/";
    static getById = RentalInfoEndpoint.baseEndpoint + "/get/";
    static deleteById = RentalInfoEndpoint.baseEndpoint + "/delete/";
}

export default RentalInfoEndpoint;