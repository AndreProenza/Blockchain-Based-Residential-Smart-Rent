import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import "../components-css/Profile.css";

export const ProfileInfoSettings = () => {
    return (
        <Container className="profile-settings-container">
            <Row className="profile-settings-row">
                <p className="profile-settings-text profile-settings-header-text">Personal Information</p>
                <Col sm>
                    <p className="profile-settings-text">First Name</p>
                    <Form.Control
                        placeholder="First Name"
                        aria-label="First Name"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">Last Name</p>
                    <Form.Control
                        placeholder="Last Name"
                        aria-label="Last Name"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">Email</p>
                    <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">Phone</p>
                    <Form.Control
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">Tax ID</p>
                    <Form.Control
                        placeholder="Tax ID"
                        aria-label="Tax ID"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
        </Container>
    );
};