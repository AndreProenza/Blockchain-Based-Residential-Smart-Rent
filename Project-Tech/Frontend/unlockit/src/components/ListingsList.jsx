import { PropertyCard } from "../components/PropertyCard";

import ListGroup from 'react-bootstrap/ListGroup';

import "../components-css/Listings.css";

export const ListingsList = () => {
    return (
        <ListGroup>
            <ListGroup.Item className="listings-property-item">
                <PropertyCard />
            </ListGroup.Item>
            <ListGroup.Item className="listings-property-item">
                <PropertyCard />
            </ListGroup.Item>
            <ListGroup.Item className="listings-property-item">
                <PropertyCard />
            </ListGroup.Item>
            <ListGroup.Item className="listings-property-item">
                <PropertyCard />
            </ListGroup.Item>
        </ListGroup>
    );
}