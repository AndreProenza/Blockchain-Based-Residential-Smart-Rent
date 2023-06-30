import { Navigator } from "../components/Navigator";
import { ListingsList } from "../components/ListingsList";
import { ListingsSettings } from "../components/ListingsSettings";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdvertiseEndpoint from '../endpoints/AdvertiseEndpoint';
import UserEndpoint from '../endpoints/UserEndpoint';
import axios from "axios";
import Auth from '../auth/Auth';

import "../components-css/Listings.css";

export const Listings = () => {

    const navigate = useNavigate();

    const listings = useSelector((state) => state.listings);
    const userLogin = useSelector((state) => state.userLogin);

    const [advertises, setAdvertises] = useState([]);

    //------- API ------- //

    // --- UserId ---
    const userId = userLogin.id;
    // ------------

    const getLoginExpireTimeUrl = UserEndpoint.getLoginExpireTime;

    const getAllByUserIdUrl = AdvertiseEndpoint.getAllByUserId;
    const getAllByLocationUrl = AdvertiseEndpoint.getAllByLocation;


    const getAllAdvertisesByUserId = async () => {
        try {
            const url = getAllByUserIdUrl + userId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("Advertises: ", response.data);
            if (listings.location === "") {
                setAdvertises(await response.data);
            }
            else {
                setAdvertises(await response.data.filter((advertise) => advertise.location === listings.location));
            }
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const getAllAdvertisesByLocation = async () => {
        try {
            const url = getAllByLocationUrl + listings.location;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("Advertises: ", response.data);
            setAdvertises(await response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };


    //------------------ //

    const checkLoginExpireTime = async () => {
        try {
            const response = await axios.get(getLoginExpireTimeUrl, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                console.log("response.data: ", response.data);
                if (Number(response.data) <= Auth.expireTimeLimit) {
                    Auth.removeTokenFromSessionStorage();
                    navigate("/login");
                }
            }
            else {
                Auth.removeTokenFromSessionStorage();
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleToggle = async (value) => {
        await checkLoginExpireTime();

        if (value === 1) {
            console.log('Listings button clicked');
            if (listings.location !== "") {
                getAllAdvertisesByLocation();
            }
            else {
                setAdvertises([]);
            }
        }
        else if (value === 2) {
            console.log('My Listings button clicked');
            getAllAdvertisesByUserId();
        }
    };

    useEffect(() => {
        console.log(listings);
        if (listings.location !== "") {
            getAllAdvertisesByLocation();
        }
    }, [listings]);

    const isLocationValid = (locationValue) => {
        const formattedLocation = locationValue.toLowerCase();
        if (
            formattedLocation === 'lisboa' ||
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
                                {advertises.length} {advertises.length === 1 ? "property" : "properties"} in <span className="listings-search-text">{listings.location ? listings.location : "Location"}</span>
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
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="toggle-group-button-listings" onChange={handleToggle}>
                        <ToggleButton variant="outline-light" id="tbg-radio-2" value={1} className="toggle-button-listings">
                            Listings
                        </ToggleButton>
                        <ToggleButton variant="outline-light" id="tbg-radio-1" value={2} className="toggle-button-listings">
                            My Listings
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {/* <ToggleListings getAllAdvertisesByUserId={getAllAdvertisesByUserId} getAllAdvertisesByLocation={getAllAdvertisesByLocation} advertises={advertises}/> */}
                </Container>
            </div>

            <Container className="container-listings">
                <Row>
                    <Col sm={3} className="settings-listings">
                        <ListingsSettings advertises={advertises} />
                    </Col>
                    <Col sm={9} className="listings-listings">
                        <ListingsList advertises={advertises} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};