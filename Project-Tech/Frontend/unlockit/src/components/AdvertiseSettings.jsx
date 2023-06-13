import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { setAdvertiseTitle, setAdvertiseLocation } from '../features/advertiseSlice'
import { setPropertyAddress, setPropertyArea, setPropertyDescription, setPropertyLocation, setPropertyType } from '../features/propertySlice';
import { useEffect } from 'react';
import * as yup from 'yup';

import "../components-css/Advertise.css";

export const AdvertiseSettings = () => {

    const advertise = useSelector((state) => state.advertise);
    const property = useSelector((state) => state.property);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log(property);
    //     console.log(advertise);
    // })

    const schema = yup.object().shape({

        area: yup.number().positive().min(5).max(10000).required("Invalid area, Valid: 5m² - 10000m²"),
        title: yup.string().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\\d\\s,.]{1,30}$/).required("Invalid title. Use only letters dots, commas and numbers"),
        propertyAddress: yup.string().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\\d\\s,.]{1,50}$/).required("Invalid address. Use only letters dots and commas and numbers"),
        description: yup.string().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\\d\\s,.]{1,300}$/).required("Invalid description. Use only letters dots and commas and numbers"),
    });

    const handleChange = (event, valueName) => {
        const value = event.target.value;

        if (valueName === "location") {
            dispatch(setPropertyLocation(value));
            dispatch(setAdvertiseLocation(value));
        }
        else if (valueName === "type") {
            dispatch(setPropertyType(value));
        }
        else if (valueName === "area") {
            dispatch(setPropertyArea(value));
        }
        else if (valueName === "title") {
            dispatch(setAdvertiseTitle(value));
        }
        else if (valueName === "propertyAddress") {
            dispatch(setPropertyAddress(value));
        }
        else if (valueName === "description") {
            dispatch(setPropertyDescription(value));
        }
        else {

        }
    };

    const handleLocationSelect = (eventKey, event) => {
        const locationName = event.target.textContent;
        dispatch(setPropertyLocation(locationName));
        dispatch(setAdvertiseLocation(locationName));
    };

    const handlePropertyTypeSelect = (eventKey, event) => {
        const type = event.target.textContent;
        dispatch(setPropertyType(type));
    };

    return (
        <Container className="advertise-settings-container">
            <Row className="advertise-settings-row">
                <p className="advertise-settings-text advertise-settings-header-text">Property</p>
                <Col sm>
                    <p className="advertise-settings-text">Property Location</p>
                    <DropdownButton id="dropdown-basic-button" className="advertise-settings-dropdown"
                        title={property.location ? property.location : "Location"} onSelect={handleLocationSelect}>
                        <Dropdown.Item >Lisbon</Dropdown.Item>
                        <Dropdown.Item >Porto</Dropdown.Item>
                        <Dropdown.Item >Faro</Dropdown.Item>
                        <Dropdown.Item >Braga</Dropdown.Item>
                        <Dropdown.Item >Coimbra</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Property Type</p>
                    <DropdownButton id="dropdown-basic-button" className="advertise-settings-dropdown"
                        title={property.type ? property.type : "Type"} onSelect={handlePropertyTypeSelect}>
                        <Dropdown.Item >Room</Dropdown.Item>
                        <Dropdown.Item >T1</Dropdown.Item>
                        <Dropdown.Item >T2</Dropdown.Item>
                        <Dropdown.Item >T3</Dropdown.Item>
                        <Dropdown.Item >T4</Dropdown.Item>
                        <Dropdown.Item >T4+</Dropdown.Item>
                        <Dropdown.Item >House</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Property Area</p>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>M²</InputGroup.Text>
                        <Form.Control
                            type="number"
                            name="area"
                            placeholder="Area"
                            aria-label="Amount (to the nearest dollar)"
                            aria-describedby="basic-addon1"
                            value={property?.area}
                            onChange={(event) => handleChange(event, "area")} />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Property Title</p>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Title"
                        aria-label="Title"
                        aria-describedby="basic-addon1"
                        value={advertise?.title}
                        onChange={(event) => handleChange(event, "title")}
                    />
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Property Address</p>
                    <Form.Control
                        type="text"
                        name="propertyAddress"
                        placeholder="Address"
                        aria-label="Address"
                        aria-describedby="basic-addon1"
                        value={property?.propertyAddress}
                        onChange={(event) => handleChange(event, "propertyAddress")}
                    />
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Property Description</p>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            name="description"
                            aria-label="With textarea"
                            placeholder="Describe your property"
                            value={property?.description}
                            onChange={(event) => handleChange(event, "description")}
                        />
                    </InputGroup>
                </Col>
            </Row>
            {/* <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text advertise-settings-header-text">Contacts</p>
                    <p className="advertise-settings-text">Full Name</p>
                    <Form.Control
                        placeholder="Full name"
                        aria-label="Full Name"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Email</p>
                    <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Phone</p>
                    <Form.Control
                        placeholder="Phone number"
                        aria-label="Phone Number"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row> */}
        </Container>
    );
};