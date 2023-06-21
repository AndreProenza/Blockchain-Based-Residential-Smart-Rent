import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";
import { ProfileInfoSettings } from "../components/ProfileInfoSettings";
import { ProfileAddressSettings } from "../components/ProfileAddressSettings";
import { ProfileDangerSettings } from "../components/ProfileDangerSettings";
import { ModalProfile } from "../components/ModalProfile";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFirstName, setUserLastName, setUserEmail, setUserPhone, setUserTaxId, setUserAddress, setUserCountry, setUserCity } from '../features/userSlice';
import UserEndpoint from '../endpoints/UserEndpoint';
import axios from "axios";
import * as yup from 'yup';

import "../components-css/Profile.css";

export const Profile = () => {

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [showSuccess, setShowSuccess] = useState(false);
    const [show, setShow] = useState(null);
    const [errors, setErrors] = useState({});

    //------- API ------- //

    // --- TEMP ---
    const userId = "648b1d05a9aa716ec1d1a559";
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

    const getUserById = async () => {
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

    //------------------ //

    const schema = yup.object().shape({
        firstName: yup
            .string()
            .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,15}$/, 'Invalid first name. (1-15 chars)')
            .required(' '),
        lastName: yup
            .string()
            .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,15}$/, 'Invalid last name. (1-15 chars)')
            .required(' '),
        email: yup
            .string()
            .email('Invalid email address')
            .required('Email is required'),
        phone: yup
            .number()
            .positive('Phone number must be positive')
            .min(900000000, 'Invalid phone number. Only PT numbers valid')
            .max(999999999, 'Invalid phone number. Only PT numbers valid')
            .required(' '),
        taxId: yup
            .number()
            .positive('Tax ID must be positive')
            .min(100000000, 'Invalid Tax ID. Only PT tax ID valid')
            .max(999999999, 'Invalid Tax ID. Only PT tax ID valid')
            .required(' '),
        address: yup
            .string()
            .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\d\s,.]{1,50}$/, 'Invalid address. Use only letters, digits, dots, commas, and spaces. (1-50 chars)')
            .required(' '),
        country: yup
            .string()
            .matches(/^[A-Za-z ]{4,44}$/, 'Invalid country.')
            .required(' '),
        city: yup
            .string()
            .matches(/^[A-Za-z ]{2,44}$/, 'Invalid city')
            .required(' '),
    });


    const apply = () => {

        schema
            .validate(user, { abortEarly: false })
            .then(() => {
                setErrors({});

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

                setShowSuccess(true);
                setShow(true);
            })
            .catch((validationErrors) => {
                setErrors(validationErrors)
                setShowSuccess(false);
                setShow(true);
            });
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

        // if (show === null) {
        //     console.log("No popup");
        // }
        // else if (show) {
        //     console.log("Success");
        // }
        // else {
        //     console.log("Errors");
        // }

    }, []);

    return (
        <>
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
            <ModalProfile show={show} setShow={setShow} errors={errors} setErrors={setErrors} showSuccess={showSuccess} setShowSuccess={setShowSuccess}/>
        </>
    );
};