import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";

import "../components-css/Profile.css";

export const ProfileDangerSettings = () => {
    return (
        <Container className="profile-settings-container-danger">
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text profile-settings-header-text-danger">Delete Account</p>
                    <Button variant="outline-danger">Delete</Button>
                </Col>
            </Row>
        </Container>
    );
};