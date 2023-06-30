import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFirstName, setUserLastName, setUserEmail, setUserPhone, setUserTaxId } from '../features/userSlice';

import "../components-css/Profile.css";

export const ProfileInfoSettings = () => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleChange = (event, valueName) => {

        if (valueName === "firstName") {
            dispatch(setUserFirstName(event.target.value));
        }
        else if (valueName === "lastName") {
            dispatch(setUserLastName(event.target.value));
        }
        else if (valueName === "email") {
            dispatch(setUserEmail(event.target.value));
        }
        else if (valueName === "phone") {
            dispatch(setUserPhone(event.target.value));
        }
        else {
            dispatch(setUserTaxId(event.target.value));
        }
    };

    return (
        <Container className="profile-settings-container">
            <Row className="profile-settings-row">
                <p className="profile-settings-text profile-settings-header-text">Personal Information</p>
                <Col sm>
                    <p className="profile-settings-text">First Name</p>
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        aria-label="First Name"
                        aria-describedby="basic-addon1"
                        value={user?.firstName || ""}
                        onChange={(event) => handleChange(event, "firstName")}
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">Last Name</p>
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        aria-label="Last Name"
                        aria-describedby="basic-addon1"
                        value={user?.lastName || ""}
                        onChange={(event) => handleChange(event, "lastName")}
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">Email</p>
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        value={user?.email || ""}
                        onChange={(event) => handleChange(event, "email")}
                        readOnly
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">Phone</p>
                    <Form.Control
                        type="number"
                        name="phone"
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                        aria-describedby="basic-addon1"
                        value={user?.phone || ""}
                        onChange={(event) => handleChange(event, "phone")}
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">Tax ID</p>
                    <Form.Control
                        type="number"
                        name="taxId"
                        placeholder="Tax ID"
                        aria-label="Tax ID"
                        aria-describedby="basic-addon1"
                        value={user?.taxId || ""}
                        onChange={(event) => handleChange(event, "taxId")}
                    />
                </Col>
            </Row>
        </Container>
    );
};