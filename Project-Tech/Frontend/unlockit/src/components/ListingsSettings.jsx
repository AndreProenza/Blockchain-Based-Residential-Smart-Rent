import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useDispatch, useSelector } from 'react-redux';
import { setListingsType, setListingsPriceMax, setListingsPriceMin, setListingsSizeMin, setListingsSizeMax } from '../features/listingsSlice';
import { useEffect } from 'react';

import "../components-css/Listings.css";

export const ListingsSettings = () => {

    const listings = useSelector((state) => state.listings);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log(listings);
    // })

    const handleListingsTypeSelect = (eventKey, event) => {
        const type = event.target.textContent;
        dispatch(setListingsType(type));
    };

    const handleListingsPriceMinSelect = (eventKey, event) => {
        const price = event.target.textContent;
        handlePrices(price, listings.priceMax, "Min");
    };

    const handleListingsPriceMaxSelect = (eventKey, event) => {
        const price = event.target.textContent;
        handlePrices(listings.priceMin, price, "Max");
    };

    const handleListingsSizeMinSelect = (eventKey, event) => {
        const size = eventKey;
        handleSizes(size, listings.sizeMax, "Min");
    };

    const handleListingsSizeMaxSelect = (eventKey, event) => {
        const size = eventKey;
        handleSizes(listings.sizeMin, size, "Max");
    };

    const handleSizes = (minSize, maxSize, sizeValue) => {
        
        const minSizeInt = parseInt(minSize);
        const maxSizeInt = parseInt(maxSize);

        if (sizeValue === "Min") {
            if (maxSizeInt === 0) {
                dispatch(setListingsSizeMin(minSizeInt));
            }
            else {
                if (minSizeInt < maxSizeInt) {
                    dispatch(setListingsSizeMin(minSizeInt));
                }
                else {
                    // Display error
                    console.log("Min Price is not less than Max Price");
                    console.log("Min: ", minSizeInt, " Max: ", maxSizeInt);
                }
            }
        }
        else {
            if (minSizeInt === 0) {
                dispatch(setListingsSizeMax(maxSizeInt));
            }
            else {
                if (minSizeInt < maxSizeInt) {
                    dispatch(setListingsSizeMax(maxSizeInt));
                }
                else {
                    // Display error
                    console.log("Min Price is not less than Max Price");
                    console.log("Min: ", minSizeInt, " Max: ", maxSizeInt);
                }
            }
        }
    }

    const handlePrices = (minPrice, maxPrice, priceValue) => {

        const minPriceInt = parseInt(minPrice);
        const maxPriceInt = parseInt(maxPrice);

        if (priceValue === "Min") {
            if (maxPriceInt === 0) {
                dispatch(setListingsPriceMin(minPriceInt));
            }
            else {
                if (minPriceInt < maxPriceInt) {
                    dispatch(setListingsPriceMin(minPriceInt));
                }
                else {
                    // Display error
                    console.log("Min Price is not less than Max Price");
                    console.log("Min: ", minPriceInt, " Max: ", maxPriceInt);
                }
            }
        }
        else {
            if (minPriceInt === 0) {
                dispatch(setListingsPriceMax(maxPriceInt));
            }
            else {
                if (minPriceInt < maxPriceInt) {
                    dispatch(setListingsPriceMax(maxPriceInt));
                }
                else {
                    // Display error
                    console.log("Min Price is not less than Max Price");
                    console.log("Min: ", minPriceInt, " Max: ", maxPriceInt);
                }
            }
        }

    };

    return (
        <Container className="listings-settings-container">
            <Row className="listings-settings-row">
                <Col sm>
                    <p className="listings-settings-text">Property</p>
                    <DropdownButton id="dropdown-basic-button" className="listings-settings-dropdown"
                        title={listings.type ? listings.type : "Type"} onSelect={handleListingsTypeSelect}>
                        <Dropdown.Item >Room</Dropdown.Item>
                        <Dropdown.Item >T1</Dropdown.Item>
                        <Dropdown.Item >T2</Dropdown.Item>
                        <Dropdown.Item >T3</Dropdown.Item>
                        <Dropdown.Item >T4</Dropdown.Item>
                        <Dropdown.Item >T4+</Dropdown.Item>
                        <Dropdown.Item >House</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="listings-settings-row">
                <Col sm>
                    <p className="listings-settings-text">Price</p>
                    <DropdownButton id="dropdown-basic-button" className="listings-settings-dropdown"
                        title={listings.priceMin ? listings.priceMin : "Min"} onSelect={handleListingsPriceMinSelect}>
                        <Dropdown.Item >1</Dropdown.Item>
                        <Dropdown.Item >50</Dropdown.Item>
                        <Dropdown.Item >100</Dropdown.Item>
                        <Dropdown.Item >150</Dropdown.Item>
                        <Dropdown.Item >200</Dropdown.Item>
                        <Dropdown.Item >250</Dropdown.Item>
                        <Dropdown.Item >300</Dropdown.Item>
                        <Dropdown.Item >350</Dropdown.Item>
                        <Dropdown.Item >400</Dropdown.Item>
                        <Dropdown.Item >450</Dropdown.Item>
                        <Dropdown.Item >500</Dropdown.Item>
                        <Dropdown.Item >550</Dropdown.Item>
                        <Dropdown.Item >600</Dropdown.Item>
                        <Dropdown.Item >650</Dropdown.Item>
                        <Dropdown.Item >700</Dropdown.Item>
                        <Dropdown.Item >750</Dropdown.Item>
                        <Dropdown.Item >800</Dropdown.Item>
                        <Dropdown.Item >850</Dropdown.Item>
                        <Dropdown.Item >900</Dropdown.Item>
                        <Dropdown.Item >950</Dropdown.Item>
                        <Dropdown.Item >1000</Dropdown.Item>
                        <Dropdown.Item >1100</Dropdown.Item>
                        <Dropdown.Item >1200</Dropdown.Item>
                        <Dropdown.Item >1300</Dropdown.Item>
                        <Dropdown.Item >1400</Dropdown.Item>
                        <Dropdown.Item >1500</Dropdown.Item>
                        <Dropdown.Item >1600</Dropdown.Item>
                        <Dropdown.Item >1700</Dropdown.Item>
                        <Dropdown.Item >1800</Dropdown.Item>
                        <Dropdown.Item >1900</Dropdown.Item>
                        <Dropdown.Item >2000</Dropdown.Item>
                        <Dropdown.Item >2500</Dropdown.Item>
                        <Dropdown.Item >3000</Dropdown.Item>
                        <Dropdown.Item >3500</Dropdown.Item>
                        <Dropdown.Item >4000</Dropdown.Item>
                        <Dropdown.Item >4500</Dropdown.Item>
                        <Dropdown.Item >5000</Dropdown.Item>

                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" className="listings-settings-dropdown"
                        title={listings.priceMax ? listings.priceMax : "Max"} onSelect={handleListingsPriceMaxSelect}>
                        <Dropdown.Item >50</Dropdown.Item>
                        <Dropdown.Item >100</Dropdown.Item>
                        <Dropdown.Item >150</Dropdown.Item>
                        <Dropdown.Item >200</Dropdown.Item>
                        <Dropdown.Item >250</Dropdown.Item>
                        <Dropdown.Item >300</Dropdown.Item>
                        <Dropdown.Item >350</Dropdown.Item>
                        <Dropdown.Item >400</Dropdown.Item>
                        <Dropdown.Item >450</Dropdown.Item>
                        <Dropdown.Item >500</Dropdown.Item>
                        <Dropdown.Item >550</Dropdown.Item>
                        <Dropdown.Item >600</Dropdown.Item>
                        <Dropdown.Item >650</Dropdown.Item>
                        <Dropdown.Item >700</Dropdown.Item>
                        <Dropdown.Item >750</Dropdown.Item>
                        <Dropdown.Item >800</Dropdown.Item>
                        <Dropdown.Item >850</Dropdown.Item>
                        <Dropdown.Item >900</Dropdown.Item>
                        <Dropdown.Item >950</Dropdown.Item>
                        <Dropdown.Item >1000</Dropdown.Item>
                        <Dropdown.Item >1100</Dropdown.Item>
                        <Dropdown.Item >1200</Dropdown.Item>
                        <Dropdown.Item >1300</Dropdown.Item>
                        <Dropdown.Item >1400</Dropdown.Item>
                        <Dropdown.Item >1500</Dropdown.Item>
                        <Dropdown.Item >1600</Dropdown.Item>
                        <Dropdown.Item >1700</Dropdown.Item>
                        <Dropdown.Item >1800</Dropdown.Item>
                        <Dropdown.Item >1900</Dropdown.Item>
                        <Dropdown.Item >2000</Dropdown.Item>
                        <Dropdown.Item >2500</Dropdown.Item>
                        <Dropdown.Item >3000</Dropdown.Item>
                        <Dropdown.Item >3500</Dropdown.Item>
                        <Dropdown.Item >4000</Dropdown.Item>
                        <Dropdown.Item >4500</Dropdown.Item>
                        <Dropdown.Item >5000</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="listings-settings-row">
                <Col sm>
                    <p className="listings-settings-text">Size</p>
                    <DropdownButton id="dropdown-basic-button" className="listings-settings-dropdown"
                        title={listings.sizeMin ? listings.sizeMin : "Min"} onSelect={handleListingsSizeMinSelect}>
                        <Dropdown.Item eventKey={5}>5 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={10}>10 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={20}>20 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={30}>30 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={40}>40 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={60}>60 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={80}>80 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={100}>100 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={120}>120 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={140}>140 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={160}>160 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={180}>180 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={200}>200 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={250}>250 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={300}>300 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={350}>350 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={400}>400 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={450}>450 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={500}>500 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={600}>600 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={700}>700 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={800}>800 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={900}>900 m²</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" className="listings-settings-dropdown"
                        title={listings.sizeMax ? listings.sizeMax : "Max"} onSelect={handleListingsSizeMaxSelect}>
                        <Dropdown.Item eventKey={10}>10 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={20}>20 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={30}>30 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={40}>40 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={60}>60 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={80}>80 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={100}>100 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={120}>120 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={140}>140 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={160}>160 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={180}>180 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={200}>200 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={250}>250 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={300}>300 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={350}>350 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={400}>400 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={450}>450 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={500}>500 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={600}>600 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={700}>700 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={800}>800 m²</Dropdown.Item>
                        <Dropdown.Item eventKey={900}>900 m²</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
        </Container>
    );
}