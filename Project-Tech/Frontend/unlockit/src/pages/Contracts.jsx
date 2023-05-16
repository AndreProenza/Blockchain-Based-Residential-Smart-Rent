import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
// import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";

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
                    <Col sm={5} className="list-contracts">
                        <ListGroup>
                            <ListGroup.Item className="contracts-list-item">
                                <p>Ola</p>
                            </ListGroup.Item>
                            <ListGroup.Item className="contracts-list-item">
                                <p>Ola</p>
                            </ListGroup.Item>
                            <ListGroup.Item className="contracts-list-item">
                                <p>Ola</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={7} className="full-contract">
                        <p>Ola</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

