import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";
import { AdvertiseSettings } from "../components/AdvertiseSettings";
import { AdvertiseRental } from "../components/AdvertiseRental";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropertyEndpoint from '../endpoints/PropertyEndpoint';
import ContractEndpoint from '../endpoints/ContractEndpoint';
import AdvertiseEndpoint from '../endpoints/AdvertiseEndpoint';
import UserEndpoint from '../endpoints/UserEndpoint';
import axios from "axios";

import logo from "../assets/home-banner.jpg"

import "../components-css/Advertise.css";


export const Advertise = () => {

    const advertise = useSelector((state) => state.advertise);
    const property = useSelector((state) => state.property);
    const contract = useSelector((state) => state.contract);

    const dispatch = useDispatch();

    //------- API ------- //

    // --- TEMP ---
    const userId = "64807026463db47afca381a2";
    // ------------
    let propertyData = {};
    let propertyId = "";
    let contractData = {};
    let contractId = "";
    let advertiseData = {};
    let advertiseId = "";
    let user = {};

    const getUserByIdUrl = UserEndpoint.getById;
    const updateUserByIdUrl = UserEndpoint.updateById;

    const registerPropertyUrl = PropertyEndpoint.register;
    const allPropertyUrl = PropertyEndpoint.all;
    const getPropertyByIdUrl = PropertyEndpoint.getById;
    const updatePropertyByIdUrl = PropertyEndpoint.updateById;
    const deletePropertyByIdUrl = PropertyEndpoint.deleteById;

    const registerContractUrl = ContractEndpoint.register;
    const allContractUrl = ContractEndpoint.all;
    const getContractByIdUrl = ContractEndpoint.getById;
    const updateContractByIdUrl = ContractEndpoint.updateById;
    const deleteContractByIdUrl = ContractEndpoint.deleteById;

    const registerAdvertiseUrl = AdvertiseEndpoint.register;
    const allAdvertiseUrl = AdvertiseEndpoint.all;
    const getAdvertiseByIdUrl = AdvertiseEndpoint.getById;
    const updateAdvertiseByIdUrl = AdvertiseEndpoint.updateById;
    const deleteAdvertiseByIdUrl = AdvertiseEndpoint.deleteById;

    const registerProperty = async () => {
        try {
            setPropertyData();

            console.log(propertyData);
            const response = await axios.post(registerPropertyUrl, propertyData);
            console.log("Status: ", response.status);
            console.log("PropertyId: ", response.data.id);
            propertyId = response.data.id;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setPropertyData = () => {

        propertyData = {
            landlordId: userId,
            address: property.propertyAddress,
            location: property.location,
            type: property.type,
            area: parseInt(property.area),
            description: property.description,
            photo: property.photo ? property.photo : null
        }
    }

    const registerContract = async () => {
        try {
            setContractData();

            console.log(contractData);
            const response = await axios.post(registerContractUrl, contractData);
            console.log("Status: ", response.status);
            console.log("ContractId: ", response.data.id);
            contractId = response.data.id;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setContractData = () => {

        contractData = {
            propertyId: propertyId,
            term: contract.term,
            initialDate: contract.initialDate,
            finalDate: contract.finalDate,
            price: parseInt(contract.price),
            conditions: contract.conditions,
            landlordId: userId,
            tenantId: null
        }
    }

    const registerAdvertise = async () => {
        try {
            setAdvertiseData();

            console.log(advertiseData);
            const response = await axios.post(registerAdvertiseUrl, advertiseData);
            console.log("Status: ", response.status);
            console.log("AdvertiseId: ", response.data.id);
            advertiseId = response.data.id;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setAdvertiseData = () => {

        advertiseData = {
            propertyId: propertyId,
            contractId: contractId,
            title: advertise.title,
            userId: userId,
            location: advertise.location
        }
    }

    const deleteProperty = async () => {
        try {
            const url = deletePropertyByIdUrl + propertyId;
            const response = await axios.delete(url);
            console.log("Status: ", response.status);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteContract = async () => {
        try {
            const url = deleteContractByIdUrl + contractId;
            const response = await axios.delete(url);
            console.log("Status: ", response.status);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAdvertise = async () => {
        try {
            const url = deleteAdvertiseByIdUrl + advertiseId;
            const response = await axios.delete(url);
            console.log("Status: ", response.status);
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async () => {
        try {
            const url = getUserByIdUrl + userId;
            const response = await axios.get(url);
            console.log("Status: ", response.status);
            console.log("User: ", response.data);
            user = response.data;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setUser = () => {
        let updatedAdvertises = user.advertises;
        let updatedContracts = user.contracts;

        updatedAdvertises.push(advertiseId);
        updatedContracts.push(contractId);

        user.advertises = updatedAdvertises;
        user.contracts = updatedContracts;
    }

    const updateUserById = async () => {
        try {
            const url = updateUserByIdUrl + userId;
            const response = await axios.put(url, user);
            console.log("Status: ", response.status);
            console.log("User: ", response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };


    //------------------ //

    useEffect(() => {
        // console.log(contract);
        // console.log(property);
        // console.log(advertise);
    });

    // useEffect(() => {
    //     console.log(property);
    // }, []);

    const publish = async () => {
        try {
            if (await registerProperty()) {
                if (await registerContract()) {
                    if (await registerAdvertise()) {
                        await getUser()
                            .then(() => {
                                setUser();
                            })
                            .catch(error => {
                                console.log("Error getting user");
                                deleteProperty();
                                deleteContract();
                                deleteAdvertise();
                            });
                    }
                    else {
                        console.log("Error registering advertise");
                        await deleteProperty();
                        await deleteContract();
                        await deleteAdvertise();
                    }
                }
                else {
                    console.log("Error registering contract");
                    await deleteProperty();
                    await deleteContract();
                }
            }
            else {
                console.log("Error registering property");
                await deleteProperty();
            }

            if (await updateUserById()) {
                console.log("User updated");
            }
            else {
                console.log("Error updating user");
                await deleteProperty();
                await deleteContract();
                await deleteAdvertise();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="advertise-banner">
            <Navigator />
            <div className="listings-top">
                <Container className="container-advertise-in-top">
                    <h5 className="advertise-publish-text">Publish</h5>
                    <p className="advertise-publish-subtext">Publish your rental property</p>
                    <Button className="button-advertise" onClick={publish}>Publish</Button>
                </Container>
            </div>

            <Container className="container-advertise">
                <Row>
                    <Col sm={6} className="settings-advertise">
                        <AdvertiseSettings />
                    </Col>
                    <Col sm={6} className="photo-advertise">
                        <Card className="photo-card-advertise">
                            <Card.Img src={logo} className="photo-card-img-advertise" />
                            <Card.Body className="card-advertise">
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Show your property in a photo</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                        <AdvertiseRental />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};