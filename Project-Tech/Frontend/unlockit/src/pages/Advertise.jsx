import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import { Navigator } from "../components/Navigator";
import { AdvertiseSettings } from "../components/AdvertiseSettings";
import { CheckboxRental } from "../components/CheckboxRental";

import logo from "../assets/home-banner.jpg"

import "../components-css/Advertise.css";


export const Advertise = () => {
    return (
        <div className="advertise-banner">
            <Navigator />
            <div className="listings-top">
                <Container className="container-advertise-in-top">
                    <h5 className="advertise-publish-text">Publish</h5>
                    <p className="advertise-publish-subtext">Publish your rental property</p>
                    <Button className="button-advertise">Publish</Button>
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
                        <Container className="container-rental-advertise">
                            <Row>
                                <Col sm className="rental-advertise">
                                    <Card className="rental-card-advertise">
                                        <Card.Body>
                                            <Row className="advertise-settings-row">
                                                <Col sm>
                                                    <p className="advertise-settings-text advertise-settings-header-text">Rental</p>
                                                    <p className="advertise-settings-text">Rental Duration</p>
                                                    <DropdownButton id="dropdown-basic-button" className="advertise-settings-dropdown" title="Duration">
                                                        <Dropdown.Item href="#/room">Long Term</Dropdown.Item>
                                                        <Dropdown.Item href="#/apartment">Short Term</Dropdown.Item>
                                                    </DropdownButton>
                                                    {/* <CheckboxRental/> */}
                                                </Col>
                                            </Row>
                                            <Row className="advertise-settings-row">
                                                <Col sm>
                                                    <p className="advertise-settings-text">Rental Price</p>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text>€</InputGroup.Text>
                                                        <Form.Control
                                                            aria-label="Rent payment frequency" />
                                                        <InputGroup.Text>Month</InputGroup.Text>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            <Row className="advertise-settings-row">
                                                <p className="advertise-settings-text">Rental Contract</p>
                                                <InputGroup>
                                                    <Form.Control
                                                        as="textarea"
                                                        aria-label="With textarea"
                                                        placeholder="Write your rental contract"
                                                    />
                                                </InputGroup>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};