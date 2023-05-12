import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import banner from '../assets/home-banner.jpg';

export const PropertyCard = () => {
    return (
        <Card className="card-property">
            <Container className="card-container">
                <Row className="card-container-row">
                    <Col sm={5}>
                        <Card.Img src={banner} />
                    </Col>
                    <Col sm={7}>
                        <Container className="card-details-container">
                            <Row>
                                <Col sm>
                                    <Card.Title className="card-details-title">Property Title</Card.Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm>
                                    <Card.Text className="card-details-price">100.000&nbsp;
                                        <span className="card-details-normal-font">€</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm>
                                    <Card.Text className="card-details-normal-font">Property Type | Property Area</Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm>
                                    <Card.Text className="card-details-text">Limit 300 characters </Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm>
                                    <Button className="card-details-button">Contact</Button>
                                    <Button className="card-details-button">Rent</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}
