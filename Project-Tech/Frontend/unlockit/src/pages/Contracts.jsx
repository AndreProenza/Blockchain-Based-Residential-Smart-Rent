import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";
import { BsSearch } from "react-icons/bs";

import "../components-css/Contracts.css";

export const Contracts = () => {
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
                            <ListGroup.Item className="contracts-list-item">
                                <Container className="container-contract-in">
                                    <Row>
                                        <Col sm={11}>
                                            <p className="contract-list-item-head-font">Contract ID/Name</p>
                                            <p className="contract-list-item-body-font">Property Title</p>
                                            <p className="contract-list-item-body-font">Landlord</p>
                                            <p className="contract-list-item-body-font">Tenant</p>
                                        </Col>
                                        <Col sm={1} className="button-contracts-c">
                                            <Button className="button-contracts"><BsSearch></BsSearch></Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={7} className="full-contract-div">
                        <Container className="full-contract-container">
                            <Row className="full-contract-buttons">
                                <Col sm className="full-contract-buttons-div">
                                    <Button variant="outline-success" size="sm" className="full-contract-button">Sign</Button>
                                    <Button variant="outline-danger" size="sm" className="full-contract-button">Reject</Button>
                                    {/* <Button className="full-contract-button">+</Button> */}
                                </Col>
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
                                                                <p className="full-contract-text"><strong>PARTIES.</strong> This Residential Lease Agreement
                                                                    is made this <strong>DATE</strong> by and between:
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    <strong>Landlord:</strong> landlordName, AND
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    <strong> Tenant(s): </strong> tenantName
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    The Landlord and Tenant are collectively referred to in this Agreement as the “Parties”.
                                                                    NOW, for the covenants contained herein, and other good and valuable consideration, the receipt
                                                                    and sufficiency of which is hereby acknowledged, the Parties agree as follows:
                                                                </p>
                                                                <p className="full-contract-text"><strong>LEASE TERM.</strong> This Agreement shall begin on the
                                                                    <strong> DATE</strong>, and end on the <strong>DATE</strong>, hereinafter known as the “Lease Term”.
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    <strong>PROPERTY.</strong> The Landlord agrees to lease the described property to the Tenant:
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    <strong>Address:</strong> address
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    <strong>Property Type:</strong> propertyType
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    <strong>Rental Term:</strong> rentalTerm
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    <strong>CONDITIONS.</strong> The Tenant agrees to the described rental conditions outlined by the Tenant:
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    rentalConditions
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    <strong>RENT.</strong> The rent to be paid by the Tenant to the Landlord throughout the term of this Agreement is
                                                                    to be made in monthly installments of <strong>€ price</strong> and shall be due on the <strong>day</strong> day of
                                                                    each month.
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    The rent should be paid automatically through <strong>Crypto Coins.</strong>
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="full-contract-row">
                                                            <Col sm>
                                                                <p className="full-contract-text">
                                                                    <strong>Date:</strong> date
                                                                </p>
                                                                <p className="full-contract-text">
                                                                    Signed automatically by both parties through digital signatures
                                                                </p>
                                                            </Col>
                                                        </Row>
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

