import { PropertyCard } from "../components/PropertyCard";
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';

import "../components-css/Listings.css";

export const ListingsList = (props) => {

    const { advertises, userId } = props;

    // useEffect(() => {

    // }, []);

    return (
        <ListGroup>
            {advertises.length > 0 ?
                (advertises.map((advertise) => {
                    if (advertise.active && !advertise.activeUsers.includes(userId)) {
                        return (
                            <ListGroup.Item className="listings-property-item" key={advertise.id}>
                                <PropertyCard show={true} advertise={advertise} userId={userId} />
                            </ListGroup.Item>
                        );
                    }
                    return null;
                })) :
                (
                    <ListGroup.Item className="listings-property-item" >
                        <PropertyCard show={false} advertise={null} userId={userId} />
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
}