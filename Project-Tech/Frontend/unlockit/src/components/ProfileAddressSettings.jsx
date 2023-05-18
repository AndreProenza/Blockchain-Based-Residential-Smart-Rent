import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import "../components-css/Profile.css";

export const ProfileAddressSettings = () => {
    return (
        <Container className="profile-settings-container">
            <Row className="profile-settings-row">
                <p className="profile-settings-text profile-settings-header-text">Address</p>
                <Col sm>
                    <p className="profile-settings-text">Address</p>
                    <Form.Control
                        placeholder="Address"
                        aria-label="Address"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">Country</p>
                    <Form.Control
                        placeholder="Country"
                        aria-label="Country"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">City</p>
                    <Form.Control
                        placeholder="City"
                        aria-label="City"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
        </Container>
    );
};