import { Navigator } from "../components/Navigator";
import { ListingsList } from "../components/ListingsList";
import { ListingsSettings } from "../components/ListingsSettings";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../components-css/Listings.css";

export const Listings = () => {
    return (
        <div className="listings-banner">
            <Navigator />
            <div className="listings-top">
                <Container className="container-in-top">
                    <h5 className="listings-search-text">Search</h5>
                    <p className="listings-search-subtext">100 properties in Location</p>
                </Container>
            </div>

            <Container className="container-listings">
                <Row>
                    <Col sm={3} className="settings-listings">
                        <ListingsSettings />
                    </Col>
                    <Col sm={9} className="listings-listings">
                        <ListingsList />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};