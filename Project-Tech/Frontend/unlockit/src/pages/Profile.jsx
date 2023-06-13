import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";
import { ProfileInfoSettings } from "../components/ProfileInfoSettings";
import { ProfileAddressSettings } from "../components/ProfileAddressSettings";
import { ProfileDangerSettings } from "../components/ProfileDangerSettings";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFirstName, setUserLastName, setUserEmail, setUserPhone, setUserTaxId, setUserAddress, setUserCountry, setUserCity } from '../features/userSlice';
import UserEndpoint from '../endpoints/UserEndpoint';
import axios from "axios";

import "../components-css/Profile.css";

export const Profile = () => {

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    //------- API ------- //

    // --- TEMP ---
    const userId = "647e28ba20de7979c712888c";
    // ------------
    let userData = {};

    const registerUrl = UserEndpoint.register;
    const allUrl = UserEndpoint.all;
    const getByEmailUrl = UserEndpoint.getByEmail;
    const getByIdUrl = UserEndpoint.getById;
    const updateByIdUrl = UserEndpoint.updateById;
    const updateByEmailUrl = UserEndpoint.updateByEmail;
    const deleteByIdUrl = UserEndpoint.deleteById;
    
    const updateUserById = () => {
        const url = updateByIdUrl + userId;
        axios.put(url, userData)
        .then(res => {
            console.log("Status: ", res.status);
            console.log("Data: ", res.data);
        })
        .catch(err => {
            console.log(err);
            console.log(err.response.data);
        });
    }

    const getUsers = () => {
        axios.get(allUrl)
        .then(res => {
            console.log("Status: ", res.status);
            console.log("Data: ", res.data);
        })
        .catch(err => {
            console.log(err);
            console.log(err.response.data);
        });
    }

    const getUserById = () => {
        const url = getByIdUrl + userId;
        axios.get(url)
        .then(res => {
            console.log("Status: ", res.status);
            // console.log("Data: ", res.data);
            setUser(res.data);
        })
        .catch(err => {
            console.log(err);
            console.log(err.response.data);
        });
    }
    
    // updateUserById();
    // getUsers();
    // getUserById();
    //------------------ //


    const apply = () => {

        userData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: parseInt(user.phone),
            taxID: parseInt(user.taxId),
            address: user.address,
            country: user.country,
            city: user.city,
            advertises: user.advertises,
            contracts: user.contracts
        }

        //console.log("User Data: ", userData);
        updateUserById();
    }

    const setUser = (userData) => {
        dispatch(setUserFirstName(userData.firstName));
        dispatch(setUserLastName(userData.lastName));
        dispatch(setUserEmail(userData.email));
        dispatch(setUserPhone(userData.phone));
        dispatch(setUserTaxId(userData.taxID));
        dispatch(setUserAddress(userData.address));
        dispatch(setUserCountry(userData.country));
        dispatch(setUserCity(userData.city));
    }

    useEffect(() => {
        getUserById();
    }, []);

    return (
        <div className="profile-banner">
            <Navigator />
            <div className="listings-top">
                <Container className="container-profile-in-top">
                    <h5 className="profile-publish-text">Profile setup</h5>
                    <p className="profile-publish-subtext">Fill out the following fields to complete your profile</p>
                    <Button className="button-profile" onClick={apply}>Apply</Button>
                </Container>
            </div>

            <Container className="container-profile">
                <Row>
                    <Col sm={6} className="settings-profile">
                        <ProfileInfoSettings />
                    </Col>
                    <Col sm={6} className="settings-profile">
                        <ProfileAddressSettings />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} className="settings-profile">
                        <ProfileDangerSettings />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};