import { PropertyCard } from "../components/PropertyCard";

import ListGroup from 'react-bootstrap/ListGroup';

import "../components-css/Listings.css";

export const ListingsList = () => {

    // Fetch contracts from db
    const advertises = [];

    return (
        <ListGroup>
            {advertises.length > 0 ?
                (advertises.map(() => {
                    return (
                        <ListGroup.Item className="listings-property-item">
                            <PropertyCard show={true}/>
                        </ListGroup.Item>
                    );
                })) :
                (
                    <ListGroup.Item className="listings-property-item">
                        <PropertyCard show={false}/>
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
}