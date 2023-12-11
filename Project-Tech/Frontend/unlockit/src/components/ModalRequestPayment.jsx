import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserEndpoint from '../endpoints/UserEndpoint';
import AdvertiseEndpoint from '../endpoints/AdvertiseEndpoint';
import ProposalEndpoint from '../endpoints/ProposalEndpoint';
import BlockchainEndpoint from '../endpoints/BlockchainEndpoint';
import Auth from '../auth/Auth';
import axios from "axios";

import '../components-css/Modal.css';
import '../components-css/Contracts.css';

export const ModalRequestPayment = (props) => {

    const { showRequestPayment, setShowRequestPayment, address, contract, proposal, proposals, advertise, tenant, userId } = props;

    const navigate = useNavigate();

    console.log("proposal: ", proposal.proposalPrice);
    
    const [amount, setAmount] = useState(proposal.proposalPrice);
    const [paymentAddress, setPaymentAddress] = useState(address);
    const [paymentTime, setPaymentTime] = useState("");
    const [coin, setCoin] = useState("");

    
    const handleClose = () => setShowRequestPayment(false);
    
    console.log("showRequestPayment: ", showRequestPayment);
    console.log("amount: ", amount);

    //------- API ------- //

    const getUserByIdUrl = UserEndpoint.getById;
    const updateUserByIdUrl = UserEndpoint.updateById;
    const getLoginExpireTimeUrl = UserEndpoint.getLoginExpireTime;

    const updateAdvertiseByIdUrl = AdvertiseEndpoint.updateById;

    const submitBlockchainOrg1 = BlockchainEndpoint.submitBlockchainOrg1ServerUrl;


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


    //------------------ //

    // const handlePriceChange = (event) => {
    //     const price = event.target.value;
    //     setAmount(price);
    // };

    // const handlePaymentAddressChange = (event) => {
    //     const paymentAddress = event.target.value;
    //     setPaymentAddress(paymentAddress);
    // };

    const isAmountValid = () => {
        return amount > 0;
    }

    const handleSelectCoin = (eventKey, event) => {
        const coin = event.target.textContent;
        console.log(coin);
        setCoin(coin);
    };

    const handlePaymentTime = (eventKey, event) => {
        const time = event.target.textContent;
        console.log(time);
        setPaymentTime(time);
    };

    const requestPayment = async () => {
        await checkLoginExpireTime();

        try {
            
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
    }, [proposal.proposalPrice])

    return (
        <>
            <Modal
                size="lg"
                show={showRequestPayment}
                onHide={() => {
                    handleClose();
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-text-title">Payment Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-success-text">Please check out the payment request details</p>
                    <Container className="container-full-contract">
                        <Row>
                            <Col sm className="full-contract-col">
                                <Card className="full-contract-card">
                                    <Card.Body>
                                        <Row className="advertise-settings-row">
                                            <p className="full-contract-text full-contract-header-text">Request a payment in a stablecoin</p>
                                            <Col sm>
                                                <p className="full-contract-text"><strong>Select a stablecoin</strong></p>
                                                <DropdownButton id="dropdown-basic-button" className="modal-settings-dropdown"
                                                    title={coin === "" ? "Stablecoin" : coin} onSelect={handleSelectCoin}>
                                                    <Dropdown.Item >USDC </Dropdown.Item>
                                                    <Dropdown.Item >USDT</Dropdown.Item>
                                                </DropdownButton>

                                                <p className="full-contract-text"><strong>Amount to request {amount}€</strong></p>
                                                {amount === 0 ? <span className="modal-rent-error-text-subtitle">Payment request cannot be 0</span> : <></>}
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text>€</InputGroup.Text>
                                                    <Form.Control
                                                        type="text"
                                                        name="amount"
                                                        placeholder="Amount"
                                                        aria-label="payment amount"
                                                        value={amount}
                                                        readOnly
                                                        // onChange={(event) => handlePriceChange(event)}
                                                    />
                                                    <InputGroup.Text>Month</InputGroup.Text>
                                                </InputGroup>

                                                <p className="full-contract-text"><strong>Request payment to this address</strong></p>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text>€</InputGroup.Text>
                                                    <Form.Control
                                                        type="text"
                                                        name="payment-address"
                                                        placeholder="Payment address"
                                                        aria-label="Payment address"
                                                        value={paymentAddress}
                                                        readOnly
                                                        // onChange={(event) => handlePaymentAddressChange(event)}
                                                    />
                                                </InputGroup>

                                                <p className="full-contract-text"><strong>Set payment time</strong></p>
                                                <DropdownButton id="dropdown-basic-button" className="modal-settings-dropdown"
                                                    title={paymentTime === "" ? "Payment time" : paymentTime} onSelect={handlePaymentTime}>
                                                    <Dropdown.Item >1 minute</Dropdown.Item>
                                                    <Dropdown.Item >15 minutes</Dropdown.Item>
                                                    <Dropdown.Item >30 minutes</Dropdown.Item>
                                                    <Dropdown.Item >1 hour</Dropdown.Item>
                                                    <Dropdown.Item >2 hours</Dropdown.Item>
                                                    <Dropdown.Item >3 hours</Dropdown.Item>
                                                    <Dropdown.Item >5 hours</Dropdown.Item>
                                                    <Dropdown.Item >10 hours</Dropdown.Item>
                                                </DropdownButton>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <br></br>
                    <p className="modal-rent-text-details-title">Are you sure you want to request a payment?</p>
                    <p className="modal-rent-text-details"><span className="modal-rent-text-details-color">Note</span>:
                        If you wish to proceed, please click on request payment and wait for the tenant to send you the payment.
                        You can check the status of your payment request by clicking on the button "<span className="modal-rent-text-details-color">Verify Payment</span>".
                        If the payment is already underway on the blockchain, it is likely to be in a "pending" state. The rental contract will only be confirmed 
                        once the status of the payment transaction is in a "confirmed" state. The tenant and the landlord may verify the status of the transaction 
                        by clicking on the the button "<span className="modal-rent-text-details-color">Verify Payment</span>".</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" disabled={!isAmountValid()} onClick={requestPayment}>
                        Request Payment
                    </Button>
                    <Button variant="primary" className="button-modal" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}