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
import { useNavigate } from 'react-router-dom';
import { setUserFirstName, setUserLastName, setUserEmail, setUserPhone, setUserTaxId, setUserAddress, setUserCountry, setUserCity } from '../features/userSlice';
import UserEndpoint from '../endpoints/UserEndpoint';
import BlockchainEndpoint from '../endpoints/BlockchainEndpoint';
import { ModalLoadWaiting } from '../components/ModalLoadWaiting';
import axios from "axios";
import * as yup from 'yup';
import Auth from '../auth/Auth';

import "../components-css/Profile.css";

export const Profile = () => {

    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const userLogin = useSelector((state) => state.userLogin);

    const dispatch = useDispatch();

    const [showSuccess, setShowSuccess] = useState(false);
    const [show, setShow] = useState(null);
    const [errors, setErrors] = useState({});
    const [loadingWaiting, setLoadingWaiting] = useState(false);


    //------- API ------- //

    // --- UserId ---
    const userId = userLogin.id;
    // ------------
    let userData = {};

    const getLoginExpireTimeUrl = UserEndpoint.getLoginExpireTime;
    const getByIdUrl = UserEndpoint.getById;
    const updateByIdUrl = UserEndpoint.updateById;

    const checkLoginExpireTime = async () => {
        try {
            const response = await axios.get(getLoginExpireTimeUrl, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                console.log("Login expire time: ", response.data);
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

    const updateUserById = () => {
        const url = updateByIdUrl + userId;
        axios.put(url, userData, Auth.authHeader())
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
        axios.get(url, Auth.authHeader())
            .then(res => {
                console.log("Status: ", res.status);
                if (res.status === 200) {
                    // console.log("Data: ", res.data);
                    setUser(res.data);
                }
                else {
                    Auth.removeTokenFromSessionStorage();
                    navigate("/login");
                }
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
            .required('First name is required'),
        lastName: yup
            .string()
            .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,15}$/, 'Invalid last name. (1-15 chars)')
            .required('Last name is required'),
        email: yup
            .string()
            .email('Invalid email address')
            .required('Email is required'),
        phone: yup
            .number()
            .positive('Phone number must be positive')
            .min(900000000, 'Invalid phone number. Only PT numbers valid')
            .max(999999999, 'Invalid phone number. Only PT numbers valid')
            .required('Phone number is required'),
        taxId: yup
            .number()
            .positive('Tax ID must be positive')
            .min(100000000, 'Invalid Tax ID. Only PT tax ID valid')
            .max(999999999, 'Invalid Tax ID. Only PT tax ID valid')
            .required(' '),
        address: yup
            .string()
            .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\d\s,.]{1,50}$/, 'Invalid address. Use only letters, digits, dots, commas, and spaces. (1-50 chars)')
            .required('Address is required'),
        country: yup
            .string()
            .matches(/^[A-Za-z ]{4,44}$/, 'Invalid country.')
            .required('Country is required'),
        city: yup
            .string()
            .matches(/^[A-Za-z ]{2,44}$/, 'Invalid city')
            .required('City is required'),
    });


    const apply = async () => {
        await checkLoginExpireTime();

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
                    landlordContracts: user.landlordContracts,
                    tenantContracts: user.tenantContracts,
                    proposalAdvertises: user.proposalAdvertises,
                    proposals: user.proposals
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
    }, []);

    /* ------------ TEST -------------- */


    const test = async () => {
        setLoadingWaiting(true);
        //Wait 3 Seconds
        setTimeout(() => {
            setLoadingWaiting(false);
        }, 1000 * 3);
    }

    const registerProperty = async () => {
        try {
            const url = BlockchainEndpoint.submitBlockchainOrg1ServerUrl;
            const assetData = {
                fcn: BlockchainEndpoint.createPropertyAssetFunction,
                args: ["107709419344541253411", "Rua 1", "Lisbon", "T2", "85", "Description 1"],
            };

            const response = await axios.post(url, assetData, Auth.authAndUsernameHeader(userId));
            console.log('Status:', response.status);
            console.log('response.data:', await response.data);
            return await response.data;
        } catch (error) {
            console.error(error);
            console.error(error.response.data);
            return null;
        }
    };

    const deleteProperty = async () => {
        try {
            const url = BlockchainEndpoint.submitBlockchainOrg1ServerUrl;
            const assetData = {
                fcn: BlockchainEndpoint.deletePropertyAssetFunction,
                args: ["PropertyAsset-c42v2708u1y8erli7zkwgmwb1i"],
            };

            const response = await axios.post(url, assetData, Auth.authAndUsernameHeader(userId));
            console.log('Status:', response.status);
            console.log('response.data:', await response.data);
            return await response.data;
        } catch (error) {
            console.error(error);
            console.error(error.response.data);
            return null;
        }
    };

    const getAllAssetsByAssetType = async () => {
        try {
            const url = BlockchainEndpoint.evaluateBlockchainOrg1ServerUrl;
            const assetsData = {
                fcn: BlockchainEndpoint.getAllAssetsByAssetTypeFunction,
                args: ["PropertyAsset"],
            };

            const response = await axios.post(url, assetsData, Auth.authHeader());
            console.log('Status:', response.status);
            console.log('response.data:', await response.data);
            return await response.data;
        } catch (error) {
            console.error(error);
            console.error(error.response.data);
            return null;
        }
    }

    const registerAsset = async () => {
        try {
            const url = BlockchainEndpoint.submitBlockchainOrg1ServerUrl;
            const assetData = {
                fcn: 'CreateAsset',
                args: ["asset0", "grey", "20", "600"],
            };

            const response = await axios.post(url, assetData, Auth.authAndUsernameHeader(userId));
            console.log('Status:', response.status);
            console.log('response.data:', await response.data);
            return await response.data;
        } catch (error) {
            console.error(error);
            console.error(error.response.data);
            return null;
        }
    };

    const getAssetById = async () => {
        try {
            const url = BlockchainEndpoint.evaluateBlockchainOrg1ServerUrl;
            const data = {
                fcn: 'ReadAsset',
                args: [userId, "asset0"],
            };

            const response = await axios.post(url, data, Auth.authHeader());
            console.log('Status:', response.status);
            console.log('response.data:', await response.data);
            return await response.data;
        } catch (error) {
            console.error(error);
            console.error(error.response.data);
            return null;
        }
    }

    const getAllAssets = async () => {
        try {
            const url = BlockchainEndpoint.evaluateBlockchainOrg1ServerUrl;
            const assetsData = {
                fcn: 'GetAllAssets',
            };

            const response = await axios.post(url, assetsData, Auth.authHeader());
            console.log('Status:', response.status);
            console.log('response.data:', await response.data);
            return await response.data;
        } catch (error) {
            console.error(error);
            console.error(error.response.data);
            return null;
        }
    }

    const assetsExists = async () => {
        try {
            const url = BlockchainEndpoint.evaluateBlockchainOrg1ServerUrl;
            const assetsData = {
                fcn: BlockchainEndpoint.assetExistsFunction,
                args: ["asset0"],
            };

            const response = await axios.post(url, assetsData, Auth.authHeader());
            console.log('Status:', response.status);
            console.log('response.data:', await response.data);
            return await response.data;
        } catch (error) {
            console.error(error);
            console.error(error.response.data);
            return null;
        }
    }

    const updateAssetById = async () => {
        try {
            const url = BlockchainEndpoint.submitBlockchainOrg1ServerUrl;
            const assetData = {
                fcn: BlockchainEndpoint.updateAssetFunction,
                args: ["asset0", "green", "1", "1"],
            };

            const response = await axios.post(url, assetData, Auth.authHeader());
            console.log('Status:', response.status);
            console.log('response.data:', await response.data);
            return await response.data;
        } catch (error) {
            console.error(error);
            console.error(error.response.data);
            return null;
        }
    }


    /* ---------------------------------- */

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
                            <Button className="button-profile" onClick={test}>Test</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <ModalLoadWaiting show={loadingWaiting} />
            <ModalProfile show={show} setShow={setShow} errors={errors} setErrors={setErrors} showSuccess={showSuccess} setShowSuccess={setShowSuccess} />
        </>
    );
};