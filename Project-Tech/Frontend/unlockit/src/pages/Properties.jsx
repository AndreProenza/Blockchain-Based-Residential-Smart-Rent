import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { BsBack } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";
import { ModalLoadWaiting } from '../components/ModalLoadWaiting';
import PropertyEndpoint from '../endpoints/PropertyEndpoint';
import PropertyPhotoEndpoint from '../endpoints/PropertyPhotoEndpoint';
import ContractEndpoint from '../endpoints/ContractEndpoint';
import UserEndpoint from '../endpoints/UserEndpoint';
import BlockchainEndpoint from '../endpoints/BlockchainEndpoint';
import { getCurrentRealWorldDate, extractDateFromString, extractDate } from '../utils/DateUtils';
import Auth from '../auth/Auth';
import axios from "axios";

import "../components-css/Contracts.css";

import banner from '../assets/home-banner.jpg';

export const Properties = () => {

    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);
    const [contract, setContract] = useState({});
    const [landlord, setLandlord] = useState({});
    const [tenant, setTenant] = useState({});
    const [userType, setUserType] = useState(null);
    const [loadingWaiting, setLoadingWaiting] = useState(false);
    let user = {};
    let contractTemp = {};

    const userLogin = useSelector((state) => state.userLogin);

    //------- API ------- //

    // --- UserId ---
    const userId = userLogin.id;
    // ------------

    const getAllByLandlordIdUrl = PropertyEndpoint.allByLandlordId;
    const getPropertyByIdUrl = PropertyEndpoint.getById;

    const getPropertyPhotoByPropertyIdUrl = PropertyPhotoEndpoint.getByPropertyId;

    const getContractByIdUrl = ContractEndpoint.getById;

    const getByIdUrl = UserEndpoint.getById;
    const getLoginExpireTimeUrl = UserEndpoint.getLoginExpireTime;

    const evaluateBlockchainOrg1 = BlockchainEndpoint.evaluateBlockchainOrg1ServerUrl;


    const checkLoginExpireTime = async () => {
        try {
            const response = await axios.get(getLoginExpireTimeUrl, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                console.log("Login expire time: ", response.data);
                if (Number(response.data) <= Auth.expireTimeLimit) {
                    Auth.removeTokenFromSessionStorage();
                    navigate("/login");
                }
            }
            else {
                Auth.removeTokenFromSessionStorage();
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUserById = async (userId, userType) => {
        try {
            const url = getByIdUrl + userId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                if (userType === "Landlord") {
                    console.log("Landlord: ", response.data);
                    setLandlord(await response.data);
                }
                else if (userType === "Tenant") {
                    console.log("Tenant: ", response.data);
                    setTenant(await response.data);
                }
                else {
                    user = await response.data;
                }
            }
            else {
                Auth.removeTokenFromSessionStorage();
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    };

    const getPropertyPhotoByPropertyId = async (propertyId) => {
        try {
            const url = getPropertyPhotoByPropertyIdUrl + propertyId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("Property Photo: ", response.data);
            return await response.data;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return null;
        }
    };

    const setPropertiesWithPhoto = async (properties) => {
        let propertiesList = [];

        for (const currentProperty of properties) {
            const propertyPhoto = await getPropertyPhotoByPropertyId(currentProperty.id);

            let property = {
                ...currentProperty,
                photo: propertyPhoto.photo,
            }
            propertiesList.push(property);
        }
        setProperties(propertiesList);
    }

    // const getContractById = async (contractId) => {
    //     try {
    //         const url = getContractByIdUrl + contractId;
    //         const response = await axios.get(url, Auth.authHeader());
    //         console.log("Status: ", response.status);
    //         console.log("Contract: ", response.data);
    //         setContract(await response.data);
    //         contractTemp = await response.data;
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         console.log(error.response.data);
    //         return false;
    //     }
    // };

    const getContractById = async (contractId) => {
        try {
            const url = evaluateBlockchainOrg1;
            const data = {
                fcn: BlockchainEndpoint.readAssetFunction,
                args: [contractId, "ContractAsset"],
            };

            const response = await axios.post(url, data, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("Contract: ", response.data);
            setContract(await response.data);
            contractTemp = await response.data;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    }

    // const getAllPropertiesByLandlordId = async () => {
    //     try {
    //         const url = getAllByLandlordIdUrl + userId;
    //         const response = await axios.get(url, Auth.authHeader());
    //         console.log("Status: ", response.status);
    //         if (response.status === 200) {
    //             console.log("Properties: ", response.data);
    //             setPropertiesWithPhoto(await response.data);
    //         }
    //         else {
    //             Auth.removeTokenFromSessionStorage();
    //             navigate("/login");
    //         }
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         console.log(error.response.data);
    //         return false;
    //     }
    // };

    const getAllPropertiesByLandlordId = async () => {
        setLoadingWaiting(true);
        try {
            const url = evaluateBlockchainOrg1;
            const data = {
                fcn: BlockchainEndpoint.readAllPropertiesByLandlordIdFunction,
                args: [userId],
            };

            const response = await axios.post(url, data, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                console.log("Properties: ", response.data);
                setPropertiesWithPhoto(await response.data);
            }
            else {
                Auth.removeTokenFromSessionStorage();
                navigate("/login");
            }
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
        finally {
            setLoadingWaiting(false);
        }
    }

    const getListOfActiveContracts = async (contractIdList) => {

        const currentDate = await getCurrentRealWorldDate();

        let activeContracts = [];
        if (contractIdList === null) {
            return activeContracts;
        }
        for (const contractId of contractIdList) {
            console.log("contractId: ", contractId);
            await getContractById(contractId);
            console.log("contractTemp: ", contractTemp);

            const contractFinalDate = extractDate(extractDateFromString(contractTemp.finalDate));
            console.log("contractFinalDate: ", contractFinalDate);
            // Contract still valid and active
            if (contractFinalDate >= currentDate) {
                activeContracts.push(contractTemp);
            }
        }
        return activeContracts;
    }


    const getAllCurrentActivePropertiesByTenantId = async (userId) => {
        
        await getUserById(userId, "User");
        console.log("user", user);
        const activeContracts = await getListOfActiveContracts(user.tenantContracts);
        console.log("activeContracts", activeContracts);

        if (activeContracts.length === 0) {
            await setPropertiesWithPhoto([]);
        }
        else {
            let propertiesList = [];
            for (const currentActiveContract of activeContracts) {
                try {
                    // const url = getPropertyByIdUrl + currentActiveContract.propertyId;
                    // const response = await axios.get(url, Auth.authHeader());
                    const url = evaluateBlockchainOrg1;
                    const data = {
                        fcn: BlockchainEndpoint.readAssetFunction,
                        args: [currentActiveContract.propertyId, "PropertyAsset"],
                    };
                    const response = await axios.post(url, data, Auth.authHeader());
                    console.log("Status: ", response.status);
                    if (response.status === 200) {
                        console.log("Property: ", response.data);
                        propertiesList.push(await response.data)
                    }
                    else {
                        Auth.removeTokenFromSessionStorage();
                        navigate("/login");
                    }
                } catch (error) {
                    console.log(error);
                    console.log(error.response.data);
                }
            }
            await setPropertiesWithPhoto(propertiesList);
        }


    };

    const handleToggle = async (value) => {
        setLoadingWaiting(true);
        
        await checkLoginExpireTime();
        
        setTenant(null);
        setProperties([]);

        await getUserById(userId, "User");
        if (value === 1) {
            console.log('Contracts as a Landlord');
            await getAllPropertiesByLandlordId(userId);
            setUserType("Landlord");
        }
        else if (value === 2) {
            console.log('Contracts as a Tenant');
            await getAllCurrentActivePropertiesByTenantId(userId);
            setUserType("Tenant");
        }
        setLoadingWaiting(false);
    };

    const copyPropertyId = async (property) => {
        await checkLoginExpireTime();
        try {
            await navigator.clipboard.writeText(property.id);
            alert("Copied to clipboard!");
        } catch (error) {
            console.error("Unable to copy to clipboard:", error);
        }

    }

    useEffect(() => {
        if (userType === null) {
            getAllPropertiesByLandlordId();
        }
    }, [userType]);

    //------------------ //

    return (
        <div className="contracts-banner">
            <Navigator />
            <div className="listings-top">
                <Container className="container-contracts-in-top">
                    <h5 className="contracts-publish-text">Properties</h5>
                    {userType === "Tenant" ? (
                        <p className="contracts-publish-subtext">View your current rented properties</p>

                    ) : (
                        <>
                            <p className="contracts-publish-subtext">View your properties</p>
                            <p className="contracts-publish-sub-subtext">You can copy a property id and paste it under advertisements</p>
                            <p className="contracts-publish-sub-subtext">to create a new advertisement for an existent property</p>
                        </>
                    )}
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="toggle-group-button-contracts" onChange={handleToggle}>
                        <ToggleButton variant="outline-light" id="tbg-radio-2" value={1} className="toggle-button-contracts">
                            Landlord
                        </ToggleButton>
                        <ToggleButton variant="outline-light" id="tbg-radio-1" value={2} className="toggle-button-contracts">
                            Tenant
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Container>
            </div>
            <Container className="container-contracts">
                <Row>
                    <Col className="full-contract-div">
                        <ListGroup className="list-contracts">
                            {properties.length > 0 ?
                                (properties.map((property) => {
                                    return (
                                        <ListGroup.Item key={property.id} className="contracts-list-item">
                                            <Card className="card-property">
                                                <Container className="card-container">
                                                    <Row className="card-container-row">
                                                        <Col sm={5}>
                                                            <Card.Img src={property.photo || banner} />
                                                        </Col>
                                                        <Col sm={6}>
                                                            <Container className="card-details-container">
                                                                <Row>
                                                                    <Col sm>
                                                                        <Card.Title className="card-details-title-property"><span className="card-details-text-black">Property ID: </span>{property.id}</Card.Title>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col sm>
                                                                        <Card.Text className="card-details-text"><span className="card-details-text-black">Landlord ID: </span>{property.landlordId} </Card.Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col sm>
                                                                        <Card.Text className="card-details-text"><span className="card-details-text-black">Characteristics: </span>{property.type} | {property.area} M² | {property.location}</Card.Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col sm>
                                                                        <Card.Text className="card-details-text"><span className="card-details-text-black">Address: </span>{property.address}</Card.Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col sm>
                                                                        <Card.Text className="card-details-text"><span className="card-details-text-black">Description: </span>{property.description} </Card.Text>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </Col>
                                                        {userType !== "Tenant" ? (
                                                            <Col sm={1} className="button-contracts-c">
                                                                <Button className="button-contracts" onClick={() => copyPropertyId(property)}><BsBack></BsBack></Button>
                                                            </Col>

                                                        ) : (
                                                            <></>
                                                        )}
                                                    </Row>
                                                </Container>
                                            </Card>
                                        </ListGroup.Item>
                                    );
                                })) :
                                (
                                    <ListGroup.Item className="contracts-list-item">
                                        <Container className="container-contract-in">
                                            <Row>
                                                <Col>
                                                    <p className="contract-list-item-head-font">No Properties available</p>
                                                    <p className="contract-list-item-body-font">Your Properties will show up here</p>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            <ModalLoadWaiting show={loadingWaiting} />
        </div>
    );
};

