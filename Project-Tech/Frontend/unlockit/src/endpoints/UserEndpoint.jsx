import React from 'react';
import BackendEndpoint from './BackendEndpoint';

class UserEndpoint extends React.Component {

    static baseEndpoint = BackendEndpoint.backendUrl + "api/user";

    static register = UserEndpoint.baseEndpoint + "/register";
    static all = UserEndpoint.baseEndpoint + "/all";
    static getByEmail = UserEndpoint.baseEndpoint + "/getbyemail/";
    static getById = UserEndpoint.baseEndpoint + "/get/";
    static updateById = UserEndpoint.baseEndpoint + "/update/";
    static updateByEmail = UserEndpoint.baseEndpoint + "/updatebyemail";
    static deleteById = UserEndpoint.baseEndpoint + "/delete/";
}

export default UserEndpoint;