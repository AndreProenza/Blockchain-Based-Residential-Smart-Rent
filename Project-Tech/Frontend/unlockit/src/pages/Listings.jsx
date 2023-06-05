import { Navigator } from "../components/Navigator";
import { ListingsList } from "../components/ListingsList";
import { ListingsSettings } from "../components/ListingsSettings";
import { ToggleListings } from "../components/ToggleListings";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { setListingsLocation } from '../features/listingsSlice';
import { useEffect } from 'react';

import "../components-css/Listings.css";

export const Listings = () => {

    const listings = useSelector((state) => state.listings);

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(setListingsLocation("Lisbon"));
        console.log(listings);
    })

    const isLocationValid = (locationValue) => {
        const formattedLocation = locationValue.toLowerCase();
        if (
            formattedLocation === 'lisbon' ||
            formattedLocation === 'porto' ||
            formattedLocation === 'faro' ||
            formattedLocation === 'braga' ||
            formattedLocation === 'coimbra'
        ) {
            return true;
        }
        return false;
    };

    return (
        <div className="listings-banner">
            <Navigator />
            <div className="listings-top">
                <Container className="container-in-top">
                    <h5 className="listings-search-text">Search</h5>
                    {isLocationValid(listings.location) ? 
                        (
                            <p className="listings-search-subtext">
                                100 properties in <span className="listings-search-text">{listings.location ? listings.location : "Location"}</span>
                            </p>
                        ) :   
                        (
                            <>
                                <p className="listings-search-subtext">
                                    No <span className="listings-search-text">Location</span> selected to search
                                </p>
                            </>
                        )
                    }  
                    <ToggleListings />
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