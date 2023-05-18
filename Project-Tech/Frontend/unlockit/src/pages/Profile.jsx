import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";
import { ProfileInfoSettings } from "../components/ProfileInfoSettings";
import { ProfileAddressSettings } from "../components/ProfileAddressSettings";
import { ProfileDangerSettings } from "../components/ProfileDangerSettings";

import "../components-css/Profile.css";

export const Profile = () => {
    return (
        <div className="profile-banner">
            <Navigator />
            <div className="listings-top">
                <Container className="container-profile-in-top">
                    <h5 className="profile-publish-text">Profile setup</h5>
                    <p className="profile-publish-subtext">Fill out the following fields to complete your profile</p>
                    <Button className="button-profile">Apply</Button>
                </Container>
            </div>

            <Container className="container-profile">
                <Row>
                    <Col sm={6} className="settings-profile">
                        <ProfileInfoSettings />
                    </Col>
                    <Col sm={6} className="settings-profile">
                        <ProfileAddressSettings />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} className="settings-profile">
                        <ProfileDangerSettings />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};