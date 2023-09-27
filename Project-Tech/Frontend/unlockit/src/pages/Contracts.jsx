import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import React from 'react';
import { BsSearch } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";
import { ModalContractSign } from "../components/ModalContractSign";
import { ModalContractReject } from '../components/ModalContractReject';
import { ModalLoadWaiting } from '../components/ModalLoadWaiting';
import AdvertiseEndpoint from '../endpoints/AdvertiseEndpoint';
import PropertyEndpoint from '../endpoints/PropertyEndpoint';
import ContractEndpoint from '../endpoints/ContractEndpoint';
import UserEndpoint from '../endpoints/UserEndpoint';
import ProposalEndpoint from '../endpoints/ProposalEndpoint';
import BlockchainEndpoint from '../endpoints/BlockchainEndpoint';
import Auth from '../auth/Auth';
import axios from "axios";

import "../components-css/Contracts.css";

export const Contracts = () => {

    const navigate = useNavigate();

    const [showRental, setShowRental] = useState(false);
    const [advertises, setAdvertises] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [property, setProperty] = useState({});
    const [contract, setContract] = useState({});
    const [currentAdvertise, setCurrentAdvertise] = useState({});
    const [currentProposal, setCurrentProposal] = useState({});
    const [landlord, setLandlord] = useState({});
    const [tenant, setTenant] = useState({});
    const [userType, setUserType] = useState(null);
    const [showSign, setShowSign] = useState(false);
    const [showReject, setShowReject] = useState(false);
    const [loadingWaiting, setLoadingWaiting] = useState(false);
    let user = {};
    let contractTemp = {};

    const userLogin = useSelector((state) => state.userLogin);

    //------- API ------- //

    // --- UserId ---
    const userId = userLogin.id;
    // ------------

    const getAllByUserIdUrl = AdvertiseEndpoint.getAllByUserId;
    const getAllByUserAdvertisesList = AdvertiseEndpoint.getAllByUserAdvertisesList;

    const getPropertyByIdUrl = PropertyEndpoint.getById;

    const getContractByIdUrl = ContractEndpoint.getById;

    const getByIdUrl = UserEndpoint.getById;
    const getLoginExpireTimeUrl = UserEndpoint.getLoginExpireTime;

    const getAllByContractIdUrl = ProposalEndpoint.allByContractId;

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

    // const getPropertyById = async (advertise) => {
    //     try {
    //         const url = getPropertyByIdUrl + advertise.propertyId;
    //         const response = await axios.get(url, Auth.authHeader());
    //         console.log("Status: ", response.status);
    //         console.log("Property: ", response.data);
    //         setProperty(await response.data);
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         console.log(error.response.data);
    //         return false;
    //     }
    // };

    const getPropertyById = async (advertise) => {
        try {
            const url = evaluateBlockchainOrg1;
            const data = {
                fcn: BlockchainEndpoint.readAssetFunction,
                args: [advertise.propertyId, "PropertyAsset"],
            };

            const response = await axios.post(url, data, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("Property: ", response.data);
            setProperty(await response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    }

    // const getContractById = async (advertise) => {
    //     try {
    //         const url = getContractByIdUrl + advertise.contractId;
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

    const getContractById = async (advertise) => {
        try {
            const url = evaluateBlockchainOrg1;
            const data = {
                fcn: BlockchainEndpoint.readAssetFunction,
                args: [advertise.contractId, "ContractAsset"],
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

    const showProposals = async (advertise) => {
        await checkLoginExpireTime();
        await getAllProposalsByContractId(advertise);
        setShowRental(false);
    }

    const handleContract = async (advertise, proposal) => {
        await checkLoginExpireTime();

        setCurrentAdvertise(advertise);
        setCurrentProposal(proposal);

        console.log("tenant: ", tenant);
        if (tenant !== null) {
            setTenant(null);
        }

        await getPropertyById(advertise);
        await getContractById(advertise);

        if (userType !== "Tenant") {
            await getUserById(userId, "Landlord");
            await getUserById(proposal.tenantId, "Tenant");
        }
        else {
            await getUserById(contractTemp.landlordId, "Landlord");
            await getUserById(userId, "Tenant");
        }

        setShowRental(true);
    }

    const handleSign = async () => {
        setShowSign(true);
    }

    const handleReject = async () => {
        setShowReject(true);
    }

    // Format from yyyy-mm-dd to dd-mm-yyyy
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const handleToggle = async (value) => {
        setLoadingWaiting(true);

        await checkLoginExpireTime();

        setShowRental(false);
        setTenant(null);
        setProposals([]);

        await getUserById(userId, "User");
        if (value === 1) {
            console.log('Contracts as a Landlord');
            await getAdvertisesByUserAdvertisesList(user.advertises);
            setUserType("Landlord");
        }
        else if (value === 2) {
            console.log('Contracts as a Tenant');
            await getAdvertisesByUserAdvertisesList(user.proposalAdvertises);
            setUserType("Tenant");
        }
        setLoadingWaiting(false);
    };

    const getAdvertisesByUserAdvertisesList = async (advertiseList) => {
        try {
            const url = getAllByUserAdvertisesList;
            const response = await axios.get(url, {
                headers: Auth.authHeader().headers,
                params: {
                    advertisesIds: advertiseList.join(','),
                },
            });
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

    // const getAllProposalsByContractId = async (advertise) => {
    //     try {
    //         const url = getAllByContractIdUrl + advertise.contractId;
    //         const response = await axios.get(url, Auth.authHeader());
    //         console.log("Status: ", response.status);
    //         if (response.status === 200) {
    //             console.log("Proposals: ", response.data);
    //             setProposals(await response.data);
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

    const getAllProposalsByContractId = async (advertise) => {
        try {
            const url = evaluateBlockchainOrg1;
            const data = {
                fcn: BlockchainEndpoint.readAllProposalsByContractIdFunction,
                args: [advertise.contractId],
            };

            const response = await axios.post(url, data, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                console.log("Proposals: ", response.data);
                setProposals(await response.data);
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
    }

    useEffect(() => {
        const getAllAdvertisesByUserId = async () => {
            setLoadingWaiting(true);
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
            finally {
                setLoadingWaiting(false);
            }
        };

        if (userType === null) {
            getAllAdvertisesByUserId();
        }
    }, [tenant]);

    //------------------ //

    return (
        <div className="contracts-banner">
            <Navigator />
            <div className="listings-top">
                <Container className="container-contracts-in-top">
                    <h5 className="contracts-publish-text">Contracts</h5>
                    <p className="contracts-publish-subtext">Manage your contracts as a Landlord or as a Tenant</p>
                    {/* <Button className="button-contracts">Sign</Button> */}
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
                    <Col sm={5} className="list-contracts-div">
                        <ListGroup className="list-contracts">
                            {advertises.length > 0 ?
                                (advertises.map((advertise) => {
                                    return (
                                        <React.Fragment key={advertise.id}>
                                            <ListGroup.Item key={advertise.id} className="contracts-list-item">
                                                <Container className="container-contract-in">
                                                    <Row>
                                                        <Col sm={11}>
                                                            <p className="contract-list-item-head-font">Contract ID: <span className="contract-list-item-id" >{advertise.contractId}</span></p>
                                                            <p className="contract-list-item-body-font">Advertise ID: <span className="contract-list-item-id" >{advertise.id}</span></p>
                                                            <p className="contract-list-item-body-font">Property ID: <span className="contract-list-item-id" >{advertise.propertyId}</span></p>
                                                        </Col>
                                                        <Col sm={1} className="button-contracts-c">
                                                            <Button className="button-contracts" onClick={() => showProposals(advertise)}><BsPlusLg></BsPlusLg></Button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </ListGroup.Item>
                                            {(proposals.length > 0 && proposals[0].contractId === advertise.contractId) ? (
                                                <ListGroup className="list-proposals">
                                                    {
                                                        (proposals.map((proposal) => {
                                                            if (userType === "Tenant") {
                                                                if (proposal.tenantId === userId) {
                                                                    return (
                                                                        <ListGroup.Item key={proposal.id} className="proposals-list-item">
                                                                            <Container className="proposal-contract-in">
                                                                                <Row>
                                                                                    <Col sm={11}>
                                                                                        <p className="contract-list-item-head-font">Proposal ID: <span className="contract-list-item-id" >{proposal.id}</span></p>
                                                                                    </Col>
                                                                                    <Col sm={1} className="button-contracts-c">
                                                                                        <Button className="button-contracts" onClick={() => handleContract(advertise, proposal)}><BsSearch></BsSearch></Button>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Container>
                                                                        </ListGroup.Item>
                                                                    );
                                                                }
                                                            }
                                                            else {
                                                                return (
                                                                    <ListGroup.Item key={proposal.id} className="proposals-list-item">
                                                                        <Container className="proposal-contract-in">
                                                                            <Row>
                                                                                <Col sm={11}>
                                                                                    <p className="contract-list-item-head-font">Proposal ID: <span className="contract-list-item-id" >{proposal.id}</span></p>
                                                                                </Col>
                                                                                <Col sm={1} className="button-contracts-c">
                                                                                    <Button className="button-contracts" onClick={() => handleContract(advertise, proposal)}><BsSearch></BsSearch></Button>
                                                                                </Col>
                                                                            </Row>
                                                                        </Container>
                                                                    </ListGroup.Item>
                                                                );
                                                            }
                                                        }))
                                                    }
                                                </ListGroup>
                                            ) :
                                                <> </>
                                            }
                                        </React.Fragment>
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
                                {showRental && !contract.signed && currentProposal.active && currentProposal.status === "awaiting" && (userType === "Landlord" || userType === null) &&
                                    <Col sm className="full-contract-buttons-div">
                                        <Button variant="outline-success" size="sm" className="full-contract-button" onClick={() => handleSign()}>Sign</Button>
                                        <Button variant="outline-danger" size="sm" className="full-contract-button" onClick={() => handleReject()}>Reject</Button>
                                    </Col>
                                }
                                {showRental && contract.signed && !currentProposal.active && currentProposal.status === "accepted" && (
                                    <span className="contract-text-signed">Signed by both parties</span>
                                )}
                                {showRental && !contract.signed && currentProposal.active && currentProposal.status === "awaiting" && userType === "Tenant" && (
                                    <span className="contract-text-awaiting">Awaiting landlord's signature</span>
                                )}
                                {showRental && !currentProposal.active && currentProposal.status === "rejected" && userType === "Tenant" && (
                                    <span className="contract-text-rejected">Proposal was rejected by the landlord</span>
                                )}
                                {showRental && !currentProposal.active && currentProposal.status === "rejected" && (userType === "Landlord" || userType === null) && (
                                    <span className="contract-text-rejected">You rejected this proposal</span>
                                )}
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
                                                                            <strong>RENT.</strong>
                                                                        </p>
                                                                        <p className="full-contract-text">
                                                                            The rental price asked by the landlord is <strong> € {currentProposal?.originalPrice}</strong>.
                                                                            The rental price proposed by the tenant is <strong> € {currentProposal?.proposalPrice}</strong>.
                                                                        </p>
                                                                        {!currentProposal.active && currentProposal.status === "rejected" ? (
                                                                            <>
                                                                                <p className="full-contract-text">
                                                                                    This contract proposal was rejected by the landlord. Some possible reasons: Unattractive proposal or tenant-landlord incompatibility.
                                                                                </p>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <p className="full-contract-text">
                                                                                    The rent to be paid by the Tenant to the Landlord throughout the term of this Agreement is
                                                                                    to be made in monthly installments of <strong>€ {currentProposal?.proposalPrice}</strong> and shall be due on the <strong>first</strong> day of
                                                                                    each month.
                                                                                </p>
                                                                                <p className="full-contract-text">
                                                                                    The rent should be paid automatically through <strong>Crypto Coins.</strong>
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="full-contract-text"><strong>No Rental Agreement available to display</strong>
                                                                        </p>
                                                                        <p className="full-contract-text">Please click on the plus symbol
                                                                            of one of your contracts on the left side of your screen to see the proposal(s) for each contract.
                                                                        </p>
                                                                        <p className="full-contract-text">Once a proposal is shown under the contract, please click on the magnifying
                                                                            glass to view further details about the proposal and the contract.
                                                                        </p>
                                                                        <p className="full-contract-text"><strong>Note:</strong> If you have no contracts on the left, please follow these
                                                                            instructions
                                                                        </p>
                                                                        <p className="full-contract-text"><strong>If you are a Landlord:</strong> and if you don't have any contracts on the left waiting to be signed,
                                                                            wait for interested tenants to submit a proposal to rent your property. Please create a new listing for your property to receive proposals.
                                                                            Once your contract has received a proposal, you may accept or reject it.
                                                                        </p>
                                                                        <p className="full-contract-text"><strong>If you are a Tenant:</strong> and if you don't have any contracts on the left already signed  or
                                                                            rejected by a landlord, please submit a proposal for a property on the listings page.
                                                                        </p>
                                                                        <p className="full-contract-text"><strong>If you are a Landlord and a Tenant:</strong> the instructions above apply.
                                                                            Both tenants and landlords can view their contracts here, however only landlords can sign or reject contracts
                                                                            while tenants can only view them.
                                                                        </p>
                                                                    </>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                        {showRental && contract.signed && !currentProposal.active && currentProposal.status === "accepted" && (
                                                            <Row className="full-contract-row">
                                                                <Col sm>
                                                                    <p className="full-contract-text">
                                                                        Signed automatically by both parties through digital signatures
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        )}
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
                <ModalLoadWaiting show={loadingWaiting} />
                <ModalContractSign showSign={showSign} setShowSign={setShowSign} contract={contract} proposal={currentProposal} proposals={proposals} advertise={currentAdvertise} tenant={tenant} userId={userId} />
                <ModalContractReject showReject={showReject} setShowReject={setShowReject} advertise={currentAdvertise} proposal={currentProposal} tenant={tenant} userId={userId} />
            </Container>
        </div>
    );
};

