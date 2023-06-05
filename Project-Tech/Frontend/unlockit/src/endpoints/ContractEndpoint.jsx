class ContractEndpoint extends React.Component {
    
    static baseEndpoint = "api/contract";

    static register = baseEndpoint + "/register";
    static all = baseEndpoint + "/all";
    static getById = baseEndpoint + "/get/";
    static updateById = baseEndpoint + "/update/";
    static deleteById = baseEndpoint + "/delete/";
}