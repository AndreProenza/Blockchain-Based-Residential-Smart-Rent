import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import "../components-css/Advertise.css";

export const AdvertiseSettings = () => {
    return (
        <Container className="advertise-settings-container">
            <Row className="advertise-settings-row">
                <p className="advertise-settings-text advertise-settings-header-text">Property</p>
                <Col sm>
                    <p className="advertise-settings-text">Property Location</p>
                    <DropdownButton id="dropdown-basic-button" className="advertise-settings-dropdown" title="Location">
                        <Dropdown.Item href="#/lisbon">Lisbon</Dropdown.Item>
                        <Dropdown.Item href="#/porto">Porto</Dropdown.Item>
                        <Dropdown.Item href="#/faro">Faro</Dropdown.Item>
                        <Dropdown.Item href="#/other">Other</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Property Type</p>
                    <DropdownButton id="dropdown-basic-button" className="advertise-settings-dropdown" title="Type">
                        <Dropdown.Item href="#/room">Room</Dropdown.Item>
                        <Dropdown.Item href="#/t1">T2</Dropdown.Item>
                        <Dropdown.Item href="#/t2">T2</Dropdown.Item>
                        <Dropdown.Item href="#/t3">T3</Dropdown.Item>
                        <Dropdown.Item href="#/t4">T4</Dropdown.Item>
                        <Dropdown.Item href="#/t4m">T4+</Dropdown.Item>
                        <Dropdown.Item href="#/house">House</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Property Area</p>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>M²</InputGroup.Text>
                        <Form.Control
                            aria-label="Amount (to the nearest dollar)" />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Property Title</p>
                    <Form.Control
                        placeholder="Title"
                        aria-label="Title"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Property Address</p>
                    <Form.Control
                        placeholder="Address"
                        aria-label="Address"
                        aria-describedby="basic-addon1"
                    />
                </Col>
            </Row>
            <Row className="advertise-settings-row">
                <Col sm>
                    <p className="advertise-settings-text">Property Description</p>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            aria-label="With textarea"
                            placeholder="Describe your property"
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="advertise-settings-row">
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
            </Row>
        </Container>
    );
};