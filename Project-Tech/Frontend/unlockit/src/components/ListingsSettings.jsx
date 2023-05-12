import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import "../components-css/Listings.css";

export const ListingsSettings = () => {
    return (
        <Container className="listings-settings-container">
            <Row className="listings-settings-row">
                <Col sm>
                    <p className="listings-settings-text">Property</p>
                    <DropdownButton id="dropdown-basic-button" className="listings-settings-dropdown" title="Type">
                        <Dropdown.Item href="#/t1">T1</Dropdown.Item>
                        <Dropdown.Item href="#/t2">T2</Dropdown.Item>
                        <Dropdown.Item href="#/t3">T3</Dropdown.Item>
                        <Dropdown.Item href="#/t4">T4</Dropdown.Item>
                        <Dropdown.Item href="#/t4m">T4+</Dropdown.Item>
                        <Dropdown.Item href="#/house">House</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="listings-settings-row">
                <Col sm>
                    <p className="listings-settings-text">Price</p>
                    <DropdownButton id="dropdown-basic-button" className="listings-settings-dropdown" title="Min">
                        <Dropdown.Item href="#">60.000</Dropdown.Item>
                        <Dropdown.Item href="#">80.000</Dropdown.Item>
                        <Dropdown.Item href="#">100.000</Dropdown.Item>
                        <Dropdown.Item href="#">120.000</Dropdown.Item>
                        <Dropdown.Item href="#">140.000</Dropdown.Item>
                        <Dropdown.Item href="#">150.000</Dropdown.Item>
                        <Dropdown.Item href="#">160.000</Dropdown.Item>
                        <Dropdown.Item href="#">180.000</Dropdown.Item>
                        <Dropdown.Item href="#">200.000</Dropdown.Item>
                        <Dropdown.Item href="#">220.000</Dropdown.Item>
                        <Dropdown.Item href="#">240.000</Dropdown.Item>
                        <Dropdown.Item href="#">260.000</Dropdown.Item>
                        <Dropdown.Item href="#">280.000</Dropdown.Item>
                        <Dropdown.Item href="#">300.000</Dropdown.Item>
                        <Dropdown.Item href="#">320.000</Dropdown.Item>
                        <Dropdown.Item href="#">360.000</Dropdown.Item>
                        <Dropdown.Item href="#">380.000</Dropdown.Item>
                        <Dropdown.Item href="#">400.000</Dropdown.Item>
                        <Dropdown.Item href="#">450.000</Dropdown.Item>
                        <Dropdown.Item href="#">500.000</Dropdown.Item>
                        <Dropdown.Item href="#">550.000</Dropdown.Item>
                        <Dropdown.Item href="#">600.000</Dropdown.Item>
                        <Dropdown.Item href="#">650.000</Dropdown.Item>
                        <Dropdown.Item href="#">700.000</Dropdown.Item>
                        <Dropdown.Item href="#">750.000</Dropdown.Item>
                        <Dropdown.Item href="#">800.000</Dropdown.Item>
                        <Dropdown.Item href="#">850.000</Dropdown.Item>
                        <Dropdown.Item href="#">900.000</Dropdown.Item>
                        <Dropdown.Item href="#">950.000</Dropdown.Item>
                        <Dropdown.Item href="#">1.0M</Dropdown.Item>
                        <Dropdown.Item href="#">1.5M</Dropdown.Item>
                        <Dropdown.Item href="#">2.0M</Dropdown.Item>
                        <Dropdown.Item href="#">2.5M</Dropdown.Item>
                        <Dropdown.Item href="#">3.0M</Dropdown.Item>
                        <Dropdown.Item href="#">3.0M+</Dropdown.Item>
                        <Dropdown.Item href="#">Unlimited</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" className="listings-settings-dropdown" title="Max">
                    <Dropdown.Item href="#">60.000</Dropdown.Item>
                        <Dropdown.Item href="#">80.000</Dropdown.Item>
                        <Dropdown.Item href="#">100.000</Dropdown.Item>
                        <Dropdown.Item href="#">120.000</Dropdown.Item>
                        <Dropdown.Item href="#">140.000</Dropdown.Item>
                        <Dropdown.Item href="#">150.000</Dropdown.Item>
                        <Dropdown.Item href="#">160.000</Dropdown.Item>
                        <Dropdown.Item href="#">180.000</Dropdown.Item>
                        <Dropdown.Item href="#">200.000</Dropdown.Item>
                        <Dropdown.Item href="#">220.000</Dropdown.Item>
                        <Dropdown.Item href="#">240.000</Dropdown.Item>
                        <Dropdown.Item href="#">260.000</Dropdown.Item>
                        <Dropdown.Item href="#">280.000</Dropdown.Item>
                        <Dropdown.Item href="#">300.000</Dropdown.Item>
                        <Dropdown.Item href="#">320.000</Dropdown.Item>
                        <Dropdown.Item href="#">360.000</Dropdown.Item>
                        <Dropdown.Item href="#">380.000</Dropdown.Item>
                        <Dropdown.Item href="#">400.000</Dropdown.Item>
                        <Dropdown.Item href="#">450.000</Dropdown.Item>
                        <Dropdown.Item href="#">500.000</Dropdown.Item>
                        <Dropdown.Item href="#">550.000</Dropdown.Item>
                        <Dropdown.Item href="#">600.000</Dropdown.Item>
                        <Dropdown.Item href="#">650.000</Dropdown.Item>
                        <Dropdown.Item href="#">700.000</Dropdown.Item>
                        <Dropdown.Item href="#">750.000</Dropdown.Item>
                        <Dropdown.Item href="#">800.000</Dropdown.Item>
                        <Dropdown.Item href="#">850.000</Dropdown.Item>
                        <Dropdown.Item href="#">900.000</Dropdown.Item>
                        <Dropdown.Item href="#">950.000</Dropdown.Item>
                        <Dropdown.Item href="#">1.0M</Dropdown.Item>
                        <Dropdown.Item href="#">1.5M</Dropdown.Item>
                        <Dropdown.Item href="#">2.0M</Dropdown.Item>
                        <Dropdown.Item href="#">2.5M</Dropdown.Item>
                        <Dropdown.Item href="#">3.0M</Dropdown.Item>
                        <Dropdown.Item href="#">3.0M+</Dropdown.Item>
                        <Dropdown.Item href="#">Unlimited</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="listings-settings-row">
                <Col sm>
                    <p className="listings-settings-text">Size</p>
                    <DropdownButton id="dropdown-basic-button" className="listings-settings-dropdown" title="Min">
                        <Dropdown.Item href="#">40 m²</Dropdown.Item>
                        <Dropdown.Item href="#">60 m²</Dropdown.Item>
                        <Dropdown.Item href="#">80 m²</Dropdown.Item>
                        <Dropdown.Item href="#">100 m²</Dropdown.Item>
                        <Dropdown.Item href="#">120 m²</Dropdown.Item>
                        <Dropdown.Item href="#">140 m²</Dropdown.Item>
                        <Dropdown.Item href="#">160 m²</Dropdown.Item>
                        <Dropdown.Item href="#">180 m²</Dropdown.Item>
                        <Dropdown.Item href="#">200 m²</Dropdown.Item>
                        <Dropdown.Item href="#">250 m²</Dropdown.Item>
                        <Dropdown.Item href="#">300 m²</Dropdown.Item>
                        <Dropdown.Item href="#">350 m²</Dropdown.Item>
                        <Dropdown.Item href="#">400 m²</Dropdown.Item>
                        <Dropdown.Item href="#">450 m²</Dropdown.Item>
                        <Dropdown.Item href="#">500 m²</Dropdown.Item>
                        <Dropdown.Item href="#">600 m²</Dropdown.Item>
                        <Dropdown.Item href="#">700 m²</Dropdown.Item>
                        <Dropdown.Item href="#">800 m²</Dropdown.Item>
                        <Dropdown.Item href="#">900 m²</Dropdown.Item>
                        <Dropdown.Item href="#">Unlimited</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" className="listings-settings-dropdown" title="Max">
                        <Dropdown.Item href="#">40 m²</Dropdown.Item>
                        <Dropdown.Item href="#">60 m²</Dropdown.Item>
                        <Dropdown.Item href="#">80 m²</Dropdown.Item>
                        <Dropdown.Item href="#">100 m²</Dropdown.Item>
                        <Dropdown.Item href="#">120 m²</Dropdown.Item>
                        <Dropdown.Item href="#">140 m²</Dropdown.Item>
                        <Dropdown.Item href="#">160 m²</Dropdown.Item>
                        <Dropdown.Item href="#">180 m²</Dropdown.Item>
                        <Dropdown.Item href="#">200 m²</Dropdown.Item>
                        <Dropdown.Item href="#">250 m²</Dropdown.Item>
                        <Dropdown.Item href="#">300 m²</Dropdown.Item>
                        <Dropdown.Item href="#">350 m²</Dropdown.Item>
                        <Dropdown.Item href="#">400 m²</Dropdown.Item>
                        <Dropdown.Item href="#">450 m²</Dropdown.Item>
                        <Dropdown.Item href="#">500 m²</Dropdown.Item>
                        <Dropdown.Item href="#">600 m²</Dropdown.Item>
                        <Dropdown.Item href="#">700 m²</Dropdown.Item>
                        <Dropdown.Item href="#">800 m²</Dropdown.Item>
                        <Dropdown.Item href="#">900 m²</Dropdown.Item>
                        <Dropdown.Item href="#">Unlimited</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="listings-settings-row">
                <Col sm>

                </Col>
            </Row>
        </Container>
    );
}