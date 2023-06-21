import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAddress, setUserCountry, setUserCity } from '../features/userSlice';

import "../components-css/Profile.css";

export const ProfileAddressSettings = () => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     // console.log(user);
    // }, [dispatch])

    const handleChange = (event, valueName) => {

        if (valueName === "address") {
            dispatch(setUserAddress(event.target.value));
            console.log(user?.address || "");
        }
        else if (valueName === "country") {
            dispatch(setUserCountry(event.target.value));
            console.log(user?.country || "");
        }
        else {
            dispatch(setUserCity(event.target.value));
            console.log(user?.city || "");
        }
    };

    return (
        <Container className="profile-settings-container">
            <Row className="profile-settings-row">
                <p className="profile-settings-text profile-settings-header-text">Address</p>
                <Col sm>
                    <p className="profile-settings-text">Address</p>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Address"
                        aria-label="Address"
                        aria-describedby="basic-addon1"
                        value={user?.address || ""}
                        onChange={(event) => handleChange(event, "address")}
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">Country</p>
                    <Form.Control
                        type="text"
                        name="country"
                        placeholder="Country"
                        aria-label="Country"
                        aria-describedby="basic-addon1"
                        value={user?.country || ""}
                        onChange={(event) => handleChange(event, "country")}
                    />
                </Col>
            </Row>
            <Row className="profile-settings-row">
                <Col sm>
                    <p className="profile-settings-text">City</p>
                    <Form.Control
                        type="text"
                        name="city"
                        placeholder="City"
                        aria-label="City"
                        aria-describedby="basic-addon1"
                        value={user?.city || ""}
                        onChange={(event) => handleChange(event, "city")}
                    />
                </Col>
            </Row>
        </Container>
    );
};