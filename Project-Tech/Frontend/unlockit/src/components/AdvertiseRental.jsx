import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { CheckboxRental } from "../components/CheckboxRental";
import { useDispatch, useSelector } from 'react-redux';
import { setContractTerm, setContractInitialDate, setContractFinalDate, setContractPrice, setContractConditions, setContractLandlordId } from '../features/contractSlice'
import { useEffect } from 'react';

import "../components-css/Advertise.css";

export const AdvertiseRental = () => {

    const contract = useSelector((state) => state.contract);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log(contract);
    // })

    const handleChange = (event, valueName) => {
        const value = event.target.value;

        if (valueName === "price") {
            dispatch(setContractPrice(value));
        }
        else {
            dispatch(setContractConditions(value));
        }
    };

    const isDateOlderThan = (initialString, finalString) => {
        const initialDate = new Date(initialString);
        const finalDate = new Date(finalString);

        return initialDate.getTime() < finalDate.getTime();
    };

    // Format from mm-dd-yyy to dd-mm-yyyy
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    // Format from dd-mm-yyyy to mm-dd-yyy
    const formatDateBack = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${month}-${day}-${year}`;
    };

    const handleTermSelect = (eventKey, event) => {
        const term = event.target.textContent;
        dispatch(setContractTerm(term));
    };

    const handleDateChange = (event, valueName) => {
        const date = event.target.value;

        if (valueName === "initialDate") {
            if (contract.finalDate === "") {
                dispatch(setContractInitialDate(date));
            }
            else {
                if (isDateOlderThan(date, contract.finalDate)) {
                    dispatch(setContractInitialDate(date));
                }
                else {
                    // Display error
                    console.log("Initial Date is not older than final Date");
                    console.log(date, " >= ", contract.finalDate);
                }
            }
        }
        else {
            if (contract.initialDate === "") {
                dispatch(setContractFinalDate(date));
            }
            else {
                if (isDateOlderThan(contract.initialDate, date)) {
                    dispatch(setContractFinalDate(date));
                }
                else {
                    // Display error
                    console.log("Initial Date is not older than final Date");
                    console.log(contract.initialDate, " >= ", date);
                }
            }
        }
    };


    return (
        <Container className="container-rental-advertise">
            <Row>
                <Col sm className="rental-advertise">
                    <Card className="rental-card-advertise">
                        <Card.Body>
                            <Row className="advertise-settings-row">
                                <Col sm>
                                    <p className="advertise-settings-text advertise-settings-header-text">Rental</p>
                                    <p className="advertise-settings-text">Rental Term</p>
                                    <DropdownButton id="dropdown-basic-button" className="advertise-settings-dropdown"
                                        title={contract.term ? contract.term : "Term"} onSelect={handleTermSelect}>
                                        <Dropdown.Item >Long Term</Dropdown.Item>
                                        <Dropdown.Item >Short Term</Dropdown.Item>
                                    </DropdownButton>
                                    {/* <CheckboxRental/> */}
                                </Col>
                            </Row>
                            <Row className="advertise-settings-row">
                                <Col sm>
                                    <p className="advertise-settings-text">Rental Price</p>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>€</InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            name="price"
                                            placeholder="Price"
                                            aria-label="Rent payment frequency"
                                            value={contract?.price}
                                            onChange={(event) => handleChange(event, "price")}
                                        />
                                        <InputGroup.Text>Month</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="advertise-settings-row">
                                <Col sm>
                                    <p className="advertise-settings-text">Initial Date</p>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="date"
                                            name="initialDate"
                                            placeholder="Rental initial date"
                                            value={contract?.initialDate}
                                            onChange={(event) => handleDateChange(event, "initialDate")}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="advertise-settings-row">
                                <Col sm>
                                    <p className="advertise-settings-text">Final Date</p>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="date"
                                            name="finalDate"
                                            placeholder="Rental final date"
                                            value={contract?.finalDate}
                                            onChange={(event) => handleDateChange(event, "finalDate")}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="advertise-settings-row">
                                <p className="advertise-settings-text">Rental Conditions</p>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        name="conditions"
                                        as="textarea"
                                        aria-label="With textarea"
                                        placeholder="Write your rental conditions"
                                        value={contract?.conditions}
                                        onChange={(event) => handleChange(event, "conditions")}
                                    />
                                </InputGroup>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};