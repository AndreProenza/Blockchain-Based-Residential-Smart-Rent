import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import AdvertiseEndpoint from '../endpoints/AdvertiseEndpoint';
import PropertyEndpoint from '../endpoints/PropertyEndpoint';
import ContractEndpoint from '../endpoints/ContractEndpoint';
import UserEndpoint from '../endpoints/UserEndpoint';
import axios from "axios";
import Auth from '../auth/Auth';

import "../components-css/Contracts.css";

export const Contracts = () => {

    const navigate = useNavigate();

    const [showRental, setShowRental] = useState(false);
    const [advertises, setAdvertises] = useState([]);
    const [property, setProperty] = useState({});
    const [contract, setContract] = useState({});
    const [landlord, setLandlord] = useState({});
    const [tenant, setTenant] = useState({});

    const userLogin = useSelector((state) => state.userLogin);

    //------- API ------- //

    // --- UserId ---
    const userId = userLogin.id;
    // ------------

    const getAllByUserIdUrl = AdvertiseEndpoint.getAllByUserId;
    const getPropertyByIdUrl = PropertyEndpoint.getById;
    const getContractByIdUrl = ContractEndpoint.getById;
    const getByIdUrl = UserEndpoint.getById;
    const getLoginExpireTimeUrl = UserEndpoint.getLoginExpireTime;

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

    const getUserById = async (userId, isLandlord) => {
        try {
            const url = getByIdUrl + userId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                if (isLandlord) {
                    console.log("Landlord: ", response.data);
                    setLandlord(await response.data);
                }
                else {
                    console.log("Tenant: ", response.data);
                    setTenant(await response.data);
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

    const handleContract = async (advertise) => {
        await checkLoginExpireTime();

        const getPropertyById = async (advertise) => {
            try {
                const url = getPropertyByIdUrl + advertise.propertyId;
                const response = await axios.get(url, Auth.authHeader());
                console.log("Status: ", response.status);
                console.log("Property: ", response.data);
                setProperty(await response.data);
                return true;
            } catch (error) {
                console.log(error);
                console.log(error.response.data);
                return false;
            }
        };

        const getContractById = async (advertise) => {
            try {
                const url = getContractByIdUrl + advertise.contractId;
                const response = await axios.get(url, Auth.authHeader());
                console.log("Status: ", response.status);
                console.log("Contract: ", response.data);
                setContract(await response.data);
                return true;
            } catch (error) {
                console.log(error);
                console.log(error.response.data);
                return false;
            }
        };

        await getPropertyById(advertise);
        await getContractById(advertise);
        setShowRental(true);
        getUserById(userId, true);
    }

    // Format from yyyy-mm-dd to dd-mm-yyyy
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const getAllAdvertisesByUserId = async () => {
            try {
                const url = getAllByUserIdUrl + userId;
                const response = await axios.get(url, Auth.authHeader());
                console.log("Status: ", response.status);
                if (response.status === 200) {
                    console.log("Advertises: ", response.data);
                    setAdvertises(await response.data);
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
        };

        getAllAdvertisesByUserId();

        if (contract.tenantId !== undefined) {
            getUserById(contract.tenantId, false);
        }

    }, [contract]);

    //------------------ //

    return (
        <div className="contracts-banner">
            <Navigator />
            <div className="listings-top">
                <Container className="container-contracts-in-top">
                    <h5 className="contracts-publish-text">Contracts</h5>
                    <p className="contracts-publish-subtext">Manage your contracts</p>
                    {/* <Button className="button-contracts">Sign</Button> */}
                </Container>
            </div>

            <Container className="container-contracts">
                <Row>
                    <Col sm={5} className="list-contracts-div">
                        <ListGroup className="list-contracts">
                            {advertises.length > 0 ?
                                (advertises.map((advertise) => {
                                    return (
                                        <ListGroup.Item key={advertise.id} className="contracts-list-item">
                                            <Container className="container-contract-in">
                                                <Row>
                                                    <Col sm={11}>
                                                        <p className="contract-list-item-head-font">Advertise ID: <span className="contract-list-item-id" >{advertise.id}</span></p>
                                                        <p className="contract-list-item-body-font">Property ID: <span className="contract-list-item-id" >{advertise.propertyId}</span></p>
                                                        <p className="contract-list-item-body-font">Contract ID: <span className="contract-list-item-id" >{advertise.contractId}</span></p>
                                                    </Col>
                                                    <Col sm={1} className="button-contracts-c">
                                                        <Button className="button-contracts" onClick={() => handleContract(advertise)}><BsSearch></BsSearch></Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </ListGroup.Item>
                                    );
                                })) :
                                (
                                    <ListGroup.Item className="contracts-list-item">
                                        <Container className="container-contract-in">
                                            <Row>
                                                <Col sm={11}>
                                                    <p className="contract-list-item-head-font">No contracts available</p>
                                                    <p className="contract-list-item-body-font">Your contracts will show up here</p>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Col>
                    <Col sm={7} className="full-contract-div">
                        <Container className="full-contract-container">
                            <Row className="full-contract-buttons">
                                {showRental ? (
                                    <Col sm className="full-contract-buttons-div">
                                        <Button variant="outline-success" size="sm" className="full-contract-button">Sign</Button>
                                        <Button variant="outline-danger" size="sm" className="full-contract-button">Reject</Button>
                                        {/* <Button className="full-contract-button">+</Button> */}
                                    </Col>
                                ) : null}
                            </Row>
                            <Row>
                                <Col sm>
                                    <Container className="container-full-contract">
                                        <Row>
                                            <Col sm className="full-contract-col">
                                                <Card className="full-contract-card">
                                                    <Card.Body>
                                                        <Row className="full-contract-row">
                                                            <Col sm>
                                                                <p className="full-contract-text full-contract-header-text">Rental Agreement</p>
                                                                {showRental ? (
                                                                    <>
                                                                        <p className="full-contract-text"><strong>PARTIES.</strong> This Residential Lease Agreement
                                                                            is made this date <strong>{formatDate(contract.initialDate)}</strong> (dd-mm-yyyy) by and between:
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            <strong>Landlord:</strong> {landlord.firstName} {landlord.lastName}
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            <strong>Tax ID: </strong>{landlord.taxID}
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            <strong> Tenant(s): </strong> {tenant?.firstName} {tenant?.lastName}
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            <strong>Tax ID: </strong>{tenant?.taxID}
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            The Landlord and Tenant are collectively referred to in this Agreement as the “Parties”.
                                                                            NOW, for the covenants contained herein, and other good and valuable consideration, the receipt
                                                                            and sufficiency of which is hereby acknowledged, the Parties agree as follows:
                                                                        </p>
                                                                        <p className="full-contract-text"><strong>LEASE TERM.</strong> This Agreement shall begin on the
                                                                            <strong> {formatDate(contract.initialDate)}</strong>, and end on the <strong>{formatDate(contract.finalDate)}</strong>,
                                                                            hereinafter known as the “Lease Term”.
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            <strong>PROPERTY.</strong> The Landlord agrees to lease the described property to the Tenant:
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            <strong>Address:</strong> {property.address}
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            <strong>Property Type:</strong> {property.type}
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            <strong>Rental Term:</strong> {contract.term}
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            <strong>CONDITIONS.</strong> The Tenant agrees to the described rental conditions outlined by the Tenant:
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            {contract.conditions}
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            <strong>RENT.</strong> The rent to be paid by the Tenant to the Landlord throughout the term of this Agreement is
                                                                            to be made in monthly installments of <strong>€ {contract.price}</strong> and shall be due on the <strong>first</strong> day of
                                                                            each month.
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            The rent should be paid automatically through <strong>Crypto Coins.</strong>
                                                                        </p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="full-contract-text"><strong>No Rental Agreement available to display</strong>
                                                                        </p>
                                                                        <p className="full-contract-text">Please click on the magnifying
                                                                            glass of one of your contracts on the left side of your screen to see further details.
                                                                        </p>
                                                                        <p className="full-contract-text"><strong>Note:</strong> If you have no contracts on the left, please follow these
                                                                            instructions
                                                                        </p>
                                                                        <p className="full-contract-text"><strong>If you are a Landlord:</strong> and if you don't have any contracts on the left waiting to be signed,
                                                                            wait for interested tenants to rent your property and accept your offer, or create a new listing for your property.
                                                                        </p>
                                                                        <p className="full-contract-text"><strong>If you are a Tenant:</strong> and if you don't have any contracts on the left already signed by
                                                                            a landlord, please accept and sign an offer on the listings page.
                                                                        </p>
                                                                        <p className="full-contract-text"><strong>If you are a Landlord and a Tenant:</strong> the instructions above apply.
                                                                            Both tenants and landlords can view their contracts here, however only landlords can sign or reject contracts
                                                                            while tenants can only view them.
                                                                        </p>
                                                                    </>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                        {showRental ? (
                                                            <Row className="full-contract-row">
                                                                <Col sm>
                                                                    <p className="full-contract-text">
                                                                        Signed automatically by both parties through digital signatures
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        ) : null}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

