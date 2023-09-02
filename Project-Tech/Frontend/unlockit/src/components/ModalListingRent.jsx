import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserEndpoint from '../endpoints/UserEndpoint';
import AdvertiseEndpoint from '../endpoints/AdvertiseEndpoint';
import ProposalEndpoint from '../endpoints/ProposalEndpoint';
import Auth from '../auth/Auth';
import axios from "axios";

import '../components-css/Modal.css';
import '../components-css/Contracts.css';

export const ModalListingRent = (props) => {

    const { showRent, setShowRent, landlord, tenant, property, contract, userId, advertise } = props;

    const navigate = useNavigate();

    const [rentalPrice, setRentalPrice] = useState(contract.price.toString());

    const handleClose = () => setShowRent(false);

    console.log("showRent: ", showRent);

    //------- API ------- //
    let user = {};
    let proposalData = {};
    let proposalId = "";

    const getUserByIdUrl = UserEndpoint.getById;
    const updateUserByIdUrl = UserEndpoint.updateById;
    const getLoginExpireTimeUrl = UserEndpoint.getLoginExpireTime;

    const updateAdvertiseByIdUrl = AdvertiseEndpoint.updateById;

    const registerProposalUrl = ProposalEndpoint.register;
    const deleteProposalByIdUrl = ProposalEndpoint.deleteById;


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

    // Format from yyyy-mm-dd to dd-mm-yyyy
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const isTenantProfileValid = (tenant) => {
        for (const key in tenant) {
            if (tenant[key] === null || tenant[key] === "" || tenant[key] === 0) {
                return false;
            }
        }
        return true;
    }

    const isRentalPriceValid = () => {
        return !rentalPrice.startsWith('0') && rentalPrice !== '';
    }

    const setUserProposalAdvertises = () => {
        let updatedProposalAdvertises = user.proposalAdvertises;

        if (!updatedProposalAdvertises.includes(advertise.id)) {
            updatedProposalAdvertises.push(advertise.id);
            user.proposalAdvertises = updatedProposalAdvertises;
        }

    }

    const setUserProposalAdvertisesRevert = () => {
        let updatedProposalAdvertises = user.proposalAdvertises;

        if (updatedProposalAdvertises.length > 0) {
            updatedProposalAdvertises.pop();
            user.proposalAdvertises = updatedProposalAdvertises;
        }
    }

    const setUserProposals = () => {
        let updatedProposals = user.proposals;

        updatedProposals.push(proposalId);
        user.proposals = updatedProposals;
    }

    const setUserProposalsRevert = () => {
        let updatedProposals = user.proposals;

        if (updatedProposals.length > 0) {
            updatedProposals.pop();
            user.proposals = updatedProposals;
        }
    }

    const getUser = async () => {
        try {
            const url = getUserByIdUrl + userId;
            const response = await axios.get(url, Auth.authHeader());
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

    const updateUserById = async () => {
        try {
            const url = updateUserByIdUrl + userId;
            const response = await axios.put(url, user, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("User: ", response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setAdvertiseActiveUsers = () => {
        let updatedActiveUsers = advertise.activeUsers;

        updatedActiveUsers.push(userId);
        advertise.activeUsers = updatedActiveUsers;
    }

    const updateAdvertiseById = async () => {
        try {
            const url = updateAdvertiseByIdUrl + advertise.id;
            const response = await axios.put(url, advertise, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("Advertise: ", response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setProposalData = () => {

        proposalData = {
            tenantId: userId,
            contractId: contract.id,
            originalPrice: contract.price,
            proposalPrice: Number(rentalPrice),
            active: true,
            status: "awaiting",
        }
    }

    const registerProposal = async () => {
        try {
            setProposalData();

            console.log(proposalData);
            const response = await axios.post(registerProposalUrl, proposalData, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("ProposalId: ", response.data.id);
            proposalId = response.data.id;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const deleteProposal = async () => {
        try {
            const url = deleteProposalByIdUrl + proposalId;
            const response = await axios.delete(url, Auth.authHeader());
            console.log("Status: ", response.status);
        } catch (error) {
            console.log(error);
        }
    };

    const submitProposal = async () => {
        await checkLoginExpireTime();

        try {
            if (await getUser()) {
                if (await registerProposal()) {
                    setUserProposalAdvertises();
                    setUserProposals();
                    if (await updateUserById()) {
                        setAdvertiseActiveUsers();
                        if (await updateAdvertiseById()) {
                            navigate("/contracts");
                        }
                        else {
                            setUserProposalAdvertisesRevert();
                            setUserProposalsRevert();
                            await updateUserById();
                            await deleteProposal();
                        }
                    }
                    else {
                        await deleteProposal();
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    //------------------ //

    const handlePriceChange = (event) => {
        const price = event.target.value;
        setRentalPrice(price);
    };

    useEffect(() => {
    }, [rentalPrice])

    return (
        <>
            <Modal
                size="lg"
                show={showRent}
                onHide={() => {
                    handleClose();
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-text-title">Rent Property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-success-text">Please check out the rental details</p>
                    <Container className="container-full-contract">
                        <Row>
                            <Col sm className="full-contract-col">
                                <Card className="full-contract-card">
                                    <Card.Body>
                                        <Row className="full-contract-row">
                                            <Col sm>
                                                <p className="full-contract-text full-contract-header-text">Rental Agreement</p>

                                                {!isTenantProfileValid(tenant) ? (
                                                    <p className="modal-rent-error-text-subtitle">
                                                        Please fill in your profile information under "<strong>Profile</strong>"
                                                        to enable you to submit a rental proposal.
                                                    </p>
                                                ) : (
                                                    <></>
                                                )}

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
                                                    to be made in monthly installments of <strong>€ {rentalPrice}</strong> and shall be due on the <strong>first</strong> day of
                                                    each month.
                                                </p>
                                                <p className="full-contract-text">
                                                    The rental price asked by the landlord is <strong> € {contract.price}</strong>.
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row className="advertise-settings-row">
                                            <Col sm>
                                                <p className="full-contract-text"><strong>Propose a different rental price</strong></p>
                                                {rentalPrice.startsWith('0') ? <span className="modal-rent-error-text-subtitle">Rental Price cannot be {rentalPrice}</span> : <></>}
                                                {rentalPrice === '' ? <span className="modal-rent-error-text-subtitle">Rental Price cannot be empty</span> : <></>}
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text>€</InputGroup.Text>
                                                    <Form.Control
                                                        type="text"
                                                        name="price"
                                                        placeholder="Price"
                                                        aria-label="Rent payment frequency"
                                                        value={rentalPrice}
                                                        onChange={(event) => handlePriceChange(event)}
                                                    />
                                                    <InputGroup.Text>Month</InputGroup.Text>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row className="advertise-settings-row">
                                            <Col sm>
                                                <p className="full-contract-text">
                                                    The rent should be paid automatically through <strong>Crypto Coins.</strong>
                                                </p>
                                                <p className="full-contract-text">
                                                    This contract will be signed automatically by both parties through digital signatures
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <br></br>
                    <p className="modal-rent-text-details-title">Are you sure you want to make an offer to rent this property?</p>
                    <p className="modal-rent-text-details"><span className="modal-rent-text-details-color">Note</span>:
                        If you wish to proceed, please click on submit proposal and wait for an acceptance response from the landlord.
                        You can check the status of your offer under "<span className="modal-rent-text-details-color">Contracts</span>".
                        If in the meantime you want to accelerate the process, please contact the landlord by email or phone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" disabled={!isTenantProfileValid(tenant) || !isRentalPriceValid()} onClick={submitProposal}>
                        Submit Proposal
                    </Button>
                    <Button variant="primary" className="button-modal" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}