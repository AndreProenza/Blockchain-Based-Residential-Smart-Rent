import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";
import { AdvertiseSettings } from "../components/AdvertiseSettings";
import { AdvertiseRental } from "../components/AdvertiseRental";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import logo from "../assets/home-banner.jpg"

import "../components-css/Advertise.css";


export const Advertise = () => {

    const advertise = useSelector((state) => state.advertise);
    const property = useSelector((state) => state.property);
    const contract = useSelector((state) => state.contract);

    // useEffect(() => {
    //     console.log(contract);
    //     console.log(property);
    //     console.log(advertise);
    // });

    const publish = () => {
        console.log('Publish');
        console.log(contract);
        console.log(property);
        console.log(advertise);
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