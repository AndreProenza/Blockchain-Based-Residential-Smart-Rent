import React from 'react';
import BackendEndpoint from './BackendEndpoint';

class PropertyEndpoint extends React.Component {
    
    static baseEndpoint = BackendEndpoint.backendUrl + "api/property";

    static register = PropertyEndpoint.baseEndpoint + "/register";
    static all = PropertyEndpoint.baseEndpoint + "/all";
    static allByLandlordId = PropertyEndpoint.baseEndpoint + "/landlord/all/by/";
    static getById = PropertyEndpoint.baseEndpoint + "/get/";
    static updateById = PropertyEndpoint.baseEndpoint + "/update/";
    static deleteById = PropertyEndpoint.baseEndpoint + "/delete/";
}

export default PropertyEndpoint;