import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalListingContact } from './ModalListingContact'
import { ModalListingRent } from './ModalListingRent'
import Auth from '../auth/Auth';
import UserEndpoint from '../endpoints/UserEndpoint';
import PropertyEndpoint from '../endpoints/PropertyEndpoint';
import PropertyPhotoEndpoint from '../endpoints/PropertyPhotoEndpoint';
import ContractEndpoint from '../endpoints/ContractEndpoint';
import BlockchainEndpoint from '../endpoints/BlockchainEndpoint';
import axios from "axios";

import banner from '../assets/home-banner.jpg';
import bannerEmpty from '../assets/empty-banner.png';

export const PropertyCard = (props) => {

    const navigate = useNavigate();

    const { show, advertise, userId } = props;

    const listings = useSelector((state) => state.listings);

    const [landlord, setLandlord] = useState({});
    const [tenant, setTenant] = useState({});
    const [property, setProperty] = useState({});
    const [propertyPhoto, setPropertyPhoto] = useState({});
    const [contract, setContract] = useState({});
    const [showContact, setShowContact] = useState(false);
    const [showRent, setShowRent] = useState(false);

    //------- API ------- //

    const getByIdUrl = UserEndpoint.getById;

    const getPropertyByIdUrl = PropertyEndpoint.getById;

    const getPropertyByPropertyIdUrl = PropertyPhotoEndpoint.getByPropertyId;

    const getContractByIdUrl = ContractEndpoint.getById;

    const evaluateBlockchainOrg1 = BlockchainEndpoint.evaluateBlockchainOrg1ServerUrl;

    const getUserById = async (userId, userType) => {
        try {
            const url = getByIdUrl + userId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                if (userType === "Landlord") {
                    console.log("Landlord: ", response.data);
                    setLandlord(await response.data);
                }
                else {
                    console.log("Tenant: ", response.data);
                    setTenant(await response.data);
                }
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

    // const getPropertyById = async () => {
    //     try {
    //         const url = getPropertyByIdUrl + advertise.propertyId;
    //         const response = await axios.get(url, Auth.authHeader());
    //         console.log("Status: ", response.status);
    //         if (response.status === 200) {
    //             console.log("Property: ", response.data);
    //             setProperty(await response.data);
    //         }
    //         else {
    //             Auth.removeTokenFromSessionStorage();
    //             navigate("/login");
    //         }
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         console.log(error.response.data);
    //         return false;
    //     }
    // };

    const getPropertyById = async () => {
        try {
            const url = evaluateBlockchainOrg1;
            const data = {
                fcn: BlockchainEndpoint.readAssetFunction,
                args: [advertise.propertyId, "PropertyAsset"],
            };

            const response = await axios.post(url, data, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                console.log("Property: ", response.data);
                setProperty(await response.data);
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
    }

    const getPropertyPhotoByPropertyId = async () => {
        try {
            const url = getPropertyByPropertyIdUrl + advertise.propertyId;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                console.log("PropertyPhoto: ", response.data);
                setPropertyPhoto(await response.data);
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

    // const getContractById = async () => {
    //     try {
    //         const url = getContractByIdUrl + advertise.contractId;
    //         const response = await axios.get(url, Auth.authHeader());
    //         console.log("Status: ", response.status);
    //         if (response.status === 200) {
    //             console.log("Contract: ", response.data);
    //             setContract(await response.data);
    //         }
    //         else {
    //             Auth.removeTokenFromSessionStorage();
    //             navigate("/login");
    //         }
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         console.log(error.response.data);
    //         return false;
    //     }
    // };

    const getContractById = async () => {
        try {
            const url = evaluateBlockchainOrg1;
            const data = {
                fcn: BlockchainEndpoint.readAssetFunction,
                args: [advertise.contractId, "ContractAsset"],
            };

            const response = await axios.post(url, data, Auth.authHeader());
            console.log("Status: ", response.status);
            if (response.status === 200) {
                console.log("Contract: ", response.data);
                setContract(await response.data);
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
    }

    useEffect(() => {
        if (advertise !== null) {
            getUserById(advertise.userId, "Landlord");
            getUserById(userId, "Tenant");
            getPropertyById();
            getPropertyPhotoByPropertyId();
            getContractById();
        }
    }, []);

    const isListingTypeValid = () => {
        if (listings.type === "") {
            return true;
        }
        if (listings.type === "All") {
            return true;
        }
        return listings.type === property.type;
    }

    const isListingPriceValid = () => {
        if (parseInt(listings.priceMax) === 0 && parseInt(listings.priceMin) <= parseInt(contract.price)) {
            return true;
        }
        return parseInt(contract.price) >= parseInt(listings.priceMin) && parseInt(contract.price) <= parseInt(listings.priceMax);
    }

    const isListingAreaValid = () => {
        if (parseInt(listings.sizeMax) === 0 && parseInt(listings.sizeMin) <= parseInt(property.area)) {
            return true;
        }
        return parseInt(property.area) >= parseInt(listings.sizeMin) && parseInt(property.area) <= parseInt(listings.sizeMax);
    }

    // const handleDelete = (key) => {
    //     setKeys((prevKeys) => prevKeys.filter((prevKey) => prevKey !== key));
    // };

    // const handleAdd = (key) => {
    //     setKeys(prevKeys => [...prevKeys, key]);
    // };

    //------------------ //

    return (
        (isListingTypeValid() && isListingPriceValid() && isListingAreaValid()) ?
            (
                <Card className="card-property">
                    <Container className="card-container">
                        <Row className="card-container-row">
                            <Col sm={5}>
                                {show ?
                                    (<Card.Img src={propertyPhoto.photo || banner} />) :
                                    (<Card.Img src={bannerEmpty} />)
                                }
                            </Col>
                            <Col sm={7}>
                                <Container className="card-details-container">
                                    {show ?
                                        (
                                            <>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Title className="card-details-title">{advertise.title}</Card.Title>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-price">{contract.price}&nbsp;
                                                            <span className="card-details-normal-font">€</span>
                                                        </Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-normal-font">{property.type} | {property.area} M² | {property.location}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-text"><span className="card-details-text-black">Address: </span>{property.address}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-text"><span className="card-details-text-black">Description: </span>{property.description} </Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    {/* <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-normal-font">{contract.term} from {contract.initialDate} to {contract.finalDate}</Card.Text>
                                                    </Col>
                                                </Row> */}
                                                    {userId !== advertise.userId ?
                                                        (
                                                            <>
                                                                <Col sm>
                                                                    <Button className="card-details-button" onClick={() => setShowContact(true)}>Contact</Button>
                                                                    <Button className="card-details-button" onClick={() => setShowRent(true)}>Rent</Button>
                                                                </Col>
                                                                <ModalListingContact showContact={showContact} setShowContact={setShowContact} landlord={landlord}/>
                                                                <ModalListingRent showRent={showRent} setShowRent={setShowRent} landlord={landlord} tenant={tenant} property={property} contract={contract} userId={userId} advertise={advertise} />
                                                            </>
                                                        ) :
                                                        (
                                                            <></>
                                                        )
                                                    }
                                                </Row>
                                            </>
                                        ) :
                                        (
                                            <>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Title className="card-details-title">Property Title</Card.Title>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-price">0&nbsp;
                                                            <span className="card-details-normal-font">€</span>
                                                        </Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-normal-font">Property Type | Property Area</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-text">Limit 300 characters </Card.Text>
                                                    </Col>
                                                </Row>
                                            </>
                                        )
                                    }
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            ) :
            (show ?
                (
                    <>
                        {/* {handleDelete(advertise.id)} */}
                    </>
                ) :
                (
                    <>
                        <Card className="card-property">
                            <Container className="card-container">
                                <Row className="card-container-row">
                                    <Col sm={5}>
                                        <Card.Img src={bannerEmpty} />
                                    </Col>
                                    <Col sm={7}>
                                        <Container className="card-details-container">
                                            <>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Title className="card-details-title">Property Title</Card.Title>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-price">0&nbsp;
                                                            <span className="card-details-normal-font">€</span>
                                                        </Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-normal-font">Property Type | Property Area</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm>
                                                        <Card.Text className="card-details-text">Limit 300 characters </Card.Text>
                                                    </Col>
                                                </Row>
                                            </>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </>
                )
            )
    );
};
