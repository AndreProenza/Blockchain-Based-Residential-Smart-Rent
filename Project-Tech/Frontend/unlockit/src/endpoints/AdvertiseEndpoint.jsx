import React from 'react';
import BackendEndpoint from './BackendEndpoint';

class AdvertiseEndpoint extends React.Component {
    
    static baseEndpoint = BackendEndpoint.backendUrl + "api/advertise";

    static register = AdvertiseEndpoint.baseEndpoint + "/register";
    static all = AdvertiseEndpoint.baseEndpoint + "/all";
    static getAllByUserId = AdvertiseEndpoint.baseEndpoint + "/user/get/all/";
    static getAllByLocation = AdvertiseEndpoint.baseEndpoint + "/location/get/all/";
    static getAllByUserAdvertisesList = AdvertiseEndpoint.baseEndpoint + "/user/get/advertises";
    static getById = AdvertiseEndpoint.baseEndpoint + "/get/";
    static updateById = AdvertiseEndpoint.baseEndpoint + "/update/";
    static deleteById = AdvertiseEndpoint.baseEndpoint + "/delete/";
}

export default AdvertiseEndpoint;