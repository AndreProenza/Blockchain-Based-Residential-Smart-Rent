class UserEndpoint extends React.Component {
    
    static baseEndpoint = "api/user";

    static register = baseEndpoint + "/register";
    static all = baseEndpoint + "/all";
    static getByEmail = baseEndpoint + "/getbyemail/";
    static getById = baseEndpoint + "/get/";
    static updateById = baseEndpoint + "/update/";
    static updateByEmail = baseEndpoint + "/updatebyemail";
    static deleteById = baseEndpoint + "/delete/";
}