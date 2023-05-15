import { Navigator } from "../components/Navigator";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { AdvertiseSettings } from "../components/AdvertiseSettings";

import logo from "../assets/home-banner.jpg"

import "../components-css/Advertise.css";


export const Advertise = () => {
    return (
        <div className="advertise-banner">
            <Navigator />
            <div className="listings-top">
                <Container className="container-advertise-in-top">
                    <h5 className="advertise-publish-text">Publish</h5>
                    <p className="advertise-publish-subtext">Publish a listing of your rental property</p>
                </Container>
            </div>

            <Container className="container-advertise">
                <Row>
                    <Col sm={6} className="settings-advertise">
                        <AdvertiseSettings />
                    </Col>
                    <Col sm={6} className="photo-advertise">
                        <Card className="photo-card-advertise">
                            <Card.Img src={logo} className="photo-card-img-advertise"/>
                            <Card.Body>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Show your property in a photo</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};