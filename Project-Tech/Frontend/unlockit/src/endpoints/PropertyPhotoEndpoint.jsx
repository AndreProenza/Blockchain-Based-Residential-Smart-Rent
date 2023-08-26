import React from 'react';
import BackendEndpoint from './BackendEndpoint';
import BlockchainEndpoint from './BlockchainEndpoint';

class PropertyPhotoEndpoint extends React.Component {
    
    static baseEndpoint = BackendEndpoint.backendUrl + "api/property-photo";

    static register = PropertyPhotoEndpoint.baseEndpoint + "/register";
    static getById = PropertyPhotoEndpoint.baseEndpoint + "/get/";
    static getByPropertyId = PropertyPhotoEndpoint.baseEndpoint + "/property/get/";
    static deleteById = PropertyPhotoEndpoint.baseEndpoint + "/delete/";
}

export default PropertyPhotoEndpoint;