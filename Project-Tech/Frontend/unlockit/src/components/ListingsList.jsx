import { PropertyCard } from "../components/PropertyCard";
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import "../components-css/Listings.css";

export const ListingsList = (props) => {

    const { advertises } = props;

    console.log("Advertises length: ", advertises.length);
    console.log("Advertises: ", advertises);

    // useEffect(() => {

    // });

    return (
        <ListGroup>
            {advertises.length > 0 ?
                (advertises.map((advertise) => {
                    return (
                        <ListGroup.Item className="listings-property-item" key={advertise.id}>
                            <PropertyCard show={true} advertise={advertise}/>
                        </ListGroup.Item>
                    );
                })) :
                (
                    <ListGroup.Item className="listings-property-item">
                        <PropertyCard show={false} advertise={null}/>
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
}