import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropertyEndpoint from '../endpoints/PropertyEndpoint';
import ContractEndpoint from '../endpoints/ContractEndpoint';
import axios from "axios";

import banner from '../assets/home-banner.jpg';
import bannerEmpty from '../assets/empty-banner.png';

export const PropertyCard = (props) => {

    const { show, advertise } = props;

    const listings = useSelector((state) => state.listings);

    const [property, setProperty] = useState({});
    const [contract, setContract] = useState({});

    //------- API ------- //

    const getPropertyByIdUrl = PropertyEndpoint.getById;
    const getContractByIdUrl = ContractEndpoint.getById;

    const getPropertyById = async () => {
        try {
            const url = getPropertyByIdUrl + advertise.propertyId;
            const response = await axios.get(url);
            console.log("Status: ", response.status);
            console.log("Property: ", response.data);
            setProperty(await response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const getContractById = async () => {
        try {
            const url = getContractByIdUrl + advertise.contractId;
            const response = await axios.get(url);
            console.log("Status: ", response.status);
            console.log("Contract: ", response.data);
            setContract(await response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    useEffect(() => {
        if (advertise !== null) {
            getPropertyById();
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

    //------------------ //

    return (
        (isListingTypeValid() && isListingPriceValid() && isListingAreaValid()) ?
            (
                <Card className="card-property">
                    <Container className="card-container">
                        <Row className="card-container-row">
                            <Col sm={5}>
                                {show ?
                                    (<Card.Img src={banner} />) :
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
                                                    <Col sm>
                                                        <Button className="card-details-button">Contact</Button>
                                                        <Button className="card-details-button">Rent</Button>
                                                    </Col>
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
                    <></>
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
