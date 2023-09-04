import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from "react-bootstrap";
import { Navigator } from "../components/Navigator";
import { AdvertiseSettings } from "../components/AdvertiseSettings";
import { AdvertiseRental } from "../components/AdvertiseRental";
import { ModalAdvertise } from "../components/ModalAdvertise";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPropertyPhotoPhoto } from '../features/propertyPhotoSlice'
import { setPropertyAddress, setPropertyArea, setPropertyDescription, setPropertyLocation, setPropertyType } from '../features/propertySlice';
import { getCurrentRealWorldDate, extractDateFromString, extractDate } from '../utils/DateUtils';
import PropertyEndpoint from '../endpoints/PropertyEndpoint';
import PropertyPhotoEndpoint from '../endpoints/PropertyPhotoEndpoint';
import ContractEndpoint from '../endpoints/ContractEndpoint';
import AdvertiseEndpoint from '../endpoints/AdvertiseEndpoint';
import UserEndpoint from '../endpoints/UserEndpoint';
import axios from "axios";
import * as yup from 'yup';
import Auth from '../auth/Auth';

import banner from "../assets/empty-banner.png"

import "../components-css/Advertise.css";


export const Advertise = () => {

    const navigate = useNavigate();

    const advertise = useSelector((state) => state.advertise);
    const property = useSelector((state) => state.property);
    const propertyPhoto = useSelector((state) => state.propertyPhoto);
    const contract = useSelector((state) => state.contract);
    const userLogin = useSelector((state) => state.userLogin);

    const dispatch = useDispatch();

    const [showSuccess, setShowSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorsDropdown, setErrorsDropdown] = useState([]);
    const [isValid, setIsValid] = useState(null);
    const [inputPropertyId, setInputPropertyId] = useState("");
    const [propertyIdError, setPropertyIdError] = useState(false);

    //------- API ------- //

    // --- UserId ---
    const userId = userLogin.id;
    // ------------
    let propertyData = {};
    let propertyPhotoData = {};
    let propertyId = "";
    let propertyPhotoId = "";
    let contractData = {};
    let contractId = "";
    let advertiseData = {};
    let advertiseId = "";
    let user = {};

    const getUserByIdUrl = UserEndpoint.getById;
    const updateUserByIdUrl = UserEndpoint.updateById;
    const getLoginExpireTimeUrl = UserEndpoint.getLoginExpireTime;

    const registerPropertyUrl = PropertyEndpoint.register;
    const getPropertyByIdUrl = PropertyEndpoint.getById;
    const deletePropertyByIdUrl = PropertyEndpoint.deleteById;

    const registerPropertyPhotoUrl = PropertyPhotoEndpoint.register;
    const getPropertyByPropertyIdUrl = PropertyPhotoEndpoint.getByPropertyId;
    const deletePropertyPhotoByIdUrl = PropertyPhotoEndpoint.deleteById;

    const registerContractUrl = ContractEndpoint.register;
    const getAllByPropertyId = ContractEndpoint.allByPropertyId;
    const deleteContractByIdUrl = ContractEndpoint.deleteById;

    const registerAdvertiseUrl = AdvertiseEndpoint.register;
    const deleteAdvertiseByIdUrl = AdvertiseEndpoint.deleteById;

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

    const registerProperty = async () => {
        try {
            setPropertyData();

            console.log(propertyData);
            const response = await axios.post(registerPropertyUrl, propertyData, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("PropertyId: ", response.data.id);
            propertyId = response.data.id;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const registerPropertyPhoto = async () => {
        try {
            setPropertyPhotoData();

            console.log(propertyPhotoData);
            const response = await axios.post(registerPropertyPhotoUrl, propertyPhotoData, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("PropertyPhotoId: ", response.data.id);
            propertyPhotoId = response.data.id;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setPropertyData = () => {

        propertyData = {
            landlordId: userId,
            address: property.propertyAddress,
            location: property.location,
            type: property.type,
            area: parseInt(property.area),
            description: property.description,
        }
    }

    const setPropertyPhotoData = () => {

        propertyPhotoData = {
            propertyId: propertyId,
            photo: propertyPhoto.photo ? propertyPhoto.photo : null
        }
    }

    const registerContract = async () => {
        try {
            setContractData();

            console.log(contractData);
            const response = await axios.post(registerContractUrl, contractData, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("ContractId: ", response.data.id);
            contractId = response.data.id;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setContractData = () => {

        contractData = {
            propertyId: propertyId,
            term: contract.term,
            initialDate: contract.initialDate,
            finalDate: contract.finalDate,
            price: parseInt(contract.price),
            conditions: contract.conditions,
            landlordId: userId,
            tenantId: null,
            signed: false,
        }
    }

    const registerAdvertise = async () => {
        try {
            setAdvertiseData();

            console.log(advertiseData);
            const response = await axios.post(registerAdvertiseUrl, advertiseData, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("AdvertiseId: ", response.data.id);
            advertiseId = response.data.id;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setAdvertiseData = () => {

        advertiseData = {
            propertyId: propertyId,
            contractId: contractId,
            title: advertise.title,
            userId: userId,
            location: advertise.location,
            activeUsers: [],
            active: true
        }
    }

    const deleteProperty = async () => {
        try {
            const url = deletePropertyByIdUrl + propertyId;
            const response = await axios.delete(url, Auth.authHeader());
            console.log("Status: ", response.status);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePropertyPhoto = async () => {
        try {
            const url = deletePropertyPhotoByIdUrl + propertyPhotoId;
            const response = await axios.delete(url, Auth.authHeader());
            console.log("Status: ", response.status);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteContract = async () => {
        try {
            const url = deleteContractByIdUrl + contractId;
            const response = await axios.delete(url, Auth.authHeader());
            console.log("Status: ", response.status);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAdvertise = async () => {
        try {
            const url = deleteAdvertiseByIdUrl + advertiseId;
            const response = await axios.delete(url, Auth.authHeader());
            console.log("Status: ", response.status);
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async () => {
        try {
            const url = getUserByIdUrl + userId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("User: ", response.data);
            user = response.data;
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const getUserProfile = async () => {
        try {
            const url = getUserByIdUrl + userId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                if (Number(response.data) <= Auth.expireTimeLimit) {
                    Auth.removeTokenFromSessionStorage();
                    navigate("/login");
                }
                //console.log("User Profile: ", response.data);
                return response.data;
            }
            else {
                Auth.removeTokenFromSessionStorage();
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return null;
        }
    };

    const setUser = () => {
        let updatedAdvertises = user.advertises;
        let updatedContracts = user.landlordContracts;

        updatedAdvertises.push(advertiseId);
        updatedContracts.push(contractId);

        user.advertises = updatedAdvertises;
        user.landlordContracts = updatedContracts;
    }

    const updateUserById = async () => {
        try {
            const url = updateUserByIdUrl + userId;
            const response = await axios.put(url, user, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("User: ", response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const getAllContractsByPropertyId = async (propertyId) => {
        try {
            const url = getAllByPropertyId + propertyId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            let contracts = null;
            if (response.status === 200) {
                console.log("Property: ", response.data);
                contracts = await response.data;
            }
            else {
                Auth.removeTokenFromSessionStorage();
                navigate("/login");
            }
            return contracts;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return null;
        }
    };
    
    const isContractActive = async (contract, currentDate) => {
        console.log("currentDate: ", currentDate);

        const contractFinalDate = extractDate(extractDateFromString(contract.finalDate));
        console.log("contractFinalDate: ", contractFinalDate);

        console.log("contractFinalDate >= currentDate: ", contractFinalDate >= currentDate);
        // Contract still valid and active
        return contractFinalDate >= currentDate;
    }

    const checkPropertyAvailabilityAndSetPropertyFields = async (property) => {

        const contracts = await getAllContractsByPropertyId(property.id);
        console.log("contracts: ", contracts);
        if (!contracts) {
            setPropertyIdError(true);
        }
        else {
            const currentDate = await getCurrentRealWorldDate();
            let foundActiveContract = false;
            for (const currentContract of contracts) {
                if (await isContractActive(currentContract, currentDate)) {
                    console.log("Entrei: ", isContractActive(currentContract, currentDate));
                    foundActiveContract = true;
                    break;
                }
            }
            console.log("foundActiveContract: ", foundActiveContract);
            if (foundActiveContract) {
                setPropertyIdError(true);
            }
            else {
                await getPropertyPhotoByPropertyId(property.id);
                dispatch(setPropertyAddress(property.address));
                dispatch(setPropertyLocation(property.location));
                dispatch(setPropertyType(property.type));
                dispatch(setPropertyArea(property.area));
                dispatch(setPropertyDescription(property.description));
            }
        }

    }

    const getPropertyById = async (propertyId) => {
        try {
            const url = getPropertyByIdUrl + propertyId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                console.log("Property: ", response.data);
                checkPropertyAvailabilityAndSetPropertyFields(await response.data);
            }
            else {
                Auth.removeTokenFromSessionStorage();
                navigate("/login");
            }
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const getPropertyPhotoByPropertyId = async (propertyId) => {
        try {
            const url = getPropertyByPropertyIdUrl + propertyId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                console.log("PropertyPhoto: ", response.data);
                dispatch(setPropertyPhotoPhoto(await response.data.photo));
            }
            else {
                Auth.removeTokenFromSessionStorage();
                navigate("/login");
            }
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };


    //------------------ //

    const isUserProfileValid = (userProfile) => {
        for (const key in userProfile) {
            if (userProfile[key] === null || userProfile[key] === "" || userProfile[key] === 0) {
                return false;
            }
        }
        return true;
    }

    const schema = yup.object().shape({
        area: yup
            .number()
            .positive("Area must be positive")
            .min(5, 'Invalid Area. Area must be greater or equal than 5 M²')
            .max(10000, "Invalid Area. Area must be less or equal than 10000 M²")
            .required("Invalid area. Valid: 5m² - 10000m²"),
        title: yup
            .string()
            .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\d\s,.]{1,40}$/, "Invalid title. Use only letters, dots, commas, and numbers. (1-40 chars)")
            .required(" "),
        propertyAddress: yup
            .string()
            .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\d\s,.]{1,50}$/, "Invalid address. Use only letters, dots, commas, and numbers. (1-50 chars)")
            .required(" "),
        description: yup
            .string()
            .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\d\s,.]{1,300}$/, "Invalid description. Use only letters, dots, commas, and numbers. (1-300 chars)")
            .required(" "),
        price: yup
            .number()
            .positive("Price must be positive")
            .integer()
            .min(1, 'Invalid Price. Price must be greater or equal than 1€')
            .required("Invalid price"),
        conditions: yup
            .string()
            .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\d\s,.]{1,300}$/, "Invalid conditions. Use only letters, dots, commas, and numbers. (1-300 chars)")
            .required(" "),
    });

    useEffect(() => {

        console.log("isValid: ", isValid);

        const publish = async () => {
            await checkLoginExpireTime();

            console.log("publish");
            try {
                if (await registerProperty()) {
                    if (await registerPropertyPhoto()) {
                        if (await registerContract()) {
                            if (await registerAdvertise()) {
                                await getUser()
                                    .then(() => {
                                        setUser();
                                    })
                                    .catch(error => {
                                        console.log("Error getting user");
                                        deleteProperty();
                                        deletePropertyPhoto();
                                        deleteContract();
                                        deleteAdvertise();
                                    });
                            }
                            else {
                                console.log("Error registering advertise");
                                await deleteProperty();
                                await deletePropertyPhoto();
                                await deleteContract();
                                await deleteAdvertise();
                            }
                        }
                        else {
                            console.log("Error registering contract");
                            await deleteProperty();
                            await deletePropertyPhoto();
                            await deleteContract();
                        }
                    }
                    else {
                        console.log("Error registering property photo");
                        await deleteProperty();
                        await deletePropertyPhoto();
                    }
                }
                else {
                    console.log("Error registering property");
                    await deleteProperty();
                }

                if (await updateUserById()) {
                    console.log("User updated");
                }
                else {
                    console.log("Error updating user");
                    await deleteProperty();
                    await deletePropertyPhoto();
                    await deleteContract();
                    await deleteAdvertise();
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (isValid === null) {
            console.log("No popup");
        }
        else if (isValid) {
            publish();
            console.log("Success");
            setShowSuccess(true);
            setShow(true);
        }
        else {
            console.log("Errors");
            setShowSuccess(false);
            setShow(true);
        }
    }, [errorsDropdown, errors]);


    const dropdownsValid = (userProfile) => {
        let isValid = true;

        if (userProfile === null) {
            isValid = false;
        }
        if (!isUserProfileValid(userProfile)) {
            setErrorsDropdown((prev) => [...prev, "Please fill in your profile information under \"Profile\" to create an advertisement."]);
            isValid = false;
        }
        if (property.location === "") {
            setErrorsDropdown((prev) => [...prev, "Empty location"]);
            isValid = false;
        }
        if (property.type === "") {
            setErrorsDropdown((prev) => [...prev, "Empty property type"]);
            isValid = false;
        }
        if (contract.term === "") {
            setErrorsDropdown((prev) => [...prev, "Empty rental term"]);
            isValid = false;
        }
        if (contract.initialDate === "") {
            setErrorsDropdown((prev) => [...prev, "Empty rental initial date"]);
            isValid = false;
        }
        if (contract.finalDate === "") {
            setErrorsDropdown((prev) => [...prev, "Empty rental final date"]);
            isValid = false;
        }
        if (propertyPhoto.photo === "") {
            setErrorsDropdown((prev) => [...prev, "Empty photo. Please upload a photo"]);
            isValid = false;
        }
        console.log("dropdownsValid - isValid: ", isValid);
        return isValid;
    }

    const validateAndPublish = async () => {

        const userProfile = await getUserProfile();

        const mergedData = { ...advertise, ...property, ...propertyPhoto, ...contract };

        try {
            const isDropdownValid = dropdownsValid(userProfile);
            console.log("isDropdownValid: ", isDropdownValid);
            setIsValid(isDropdownValid);

            schema
                .validate(mergedData, { abortEarly: false })
                .then(() => {
                    // console.log("Success");
                    setErrors({});
                })
                .catch((validationErrors) => {
                    // validationErrors.inner.forEach((error) => {
                    // console.log(error.message);
                    // });
                    setErrors(validationErrors);
                    setIsValid(false);
                });

        } catch (error) {
            console.log(error);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        });
    };

    const handleFileUpload = async (event) => {
        const photoFile = event.target.files[0];
        const photoBase64 = await convertToBase64(photoFile);

        dispatch(setPropertyPhotoPhoto(photoBase64));
    };

    const handlePropertyId = async (event) => {
        const propertyId = event.target.value;
        setPropertyIdError(false);
        setInputPropertyId(propertyId);
        const isPropertyValid = await getPropertyById(propertyId);
        if (!isPropertyValid) {
            setPropertyNull();
        }
        console.log("property: ", property);
    };

    const setPropertyNull = async () => {
        dispatch(setPropertyAddress(""));
        dispatch(setPropertyLocation(""));
        dispatch(setPropertyType(""));
        dispatch(setPropertyArea(""));
        dispatch(setPropertyDescription(""));
        dispatch(setPropertyPhotoPhoto(""));
    }

    return (
        <>
            <div className="advertise-banner">
                <Navigator />
                <div className="listings-top">
                    <Container className="container-advertise-in-top">
                        <h5 className="advertise-publish-text">Publish</h5>
                        <p className="advertise-publish-subtext">Publish your rental property</p>
                        <p className="contracts-publish-sub-subtext">You can register a new property and create a new advertisement, or you can create an advertisement for an existent property.</p>
                        <p className="contracts-publish-sub-subtext">To create an advertisement for an existent property, just copy a property id from properties page and paste it below.</p>
                        {propertyIdError ? <p className="modal-rent-error-text-subtitle">Impossible to create an new advertisement for this property id. The property is currently under a rental contract.</p> : <></>}
                        <Button className="button-advertise" onClick={validateAndPublish}>Publish</Button>
                    </Container>
                </div>

                <Container className="container-advertise">
                    <Row>
                        <Col sm={6} className="settings-advertise">
                            <InputGroup className="mb-1">
                                <InputGroup.Text>ID</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    name="id"
                                    placeholder="Property Id"
                                    aria-label="Property Id"
                                    value={inputPropertyId}
                                    onChange={(event) => handlePropertyId(event)}
                                />
                            </InputGroup>
                            <AdvertiseSettings />
                        </Col>
                        <Col sm={6} className="photo-advertise">
                            <Card className="photo-card-advertise">
                                <Card.Img src={propertyPhoto.photo || banner} className="photo-card-img-advertise" />
                                <Card.Body className="card-advertise">
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Show your property in a photo</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept='.jpeg, .png, .jpg'
                                            onChange={handleFileUpload}
                                        />
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                            <AdvertiseRental />
                        </Col>
                    </Row>
                </Container>
            </div>
            <ModalAdvertise show={show} setShow={setShow} errors={errors}
                showSuccess={showSuccess} setShowSuccess={setShowSuccess}
                errorsDropdown={errorsDropdown} setErrorsDropdown={setErrorsDropdown} setIsValid={setIsValid} />
        </>
    );
};