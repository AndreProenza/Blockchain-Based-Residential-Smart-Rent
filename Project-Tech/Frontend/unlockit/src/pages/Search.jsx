import logo from "../assets/log.svg"
import { Navigator } from "../components/Navigator";
import Form from 'react-bootstrap/Form';
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { setListingsLocation } from '../features/listingsSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../components-css/Search.css';

export const Search = () => {

  const listings = useSelector((state) => state.listings);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // useEffect(() => {
    // console.log(listings);
  // })

  const handleSearch = (event) => {
    event.preventDefault();
    const location = listings.location;

    if (isLocationValid(location)) {
      // console.log("Valid location:", location);

      const locationFormatted = location.toLowerCase();
      switch (locationFormatted) {
        case "lisboa":
          dispatch(setListingsLocation("Lisbon"));
          break;
        case "lisbon":
          dispatch(setListingsLocation(capitalizeFirstLetter(locationFormatted)));
          break;
        case "porto":
          dispatch(setListingsLocation(capitalizeFirstLetter(locationFormatted)));
          break;
        case "faro":
          dispatch(setListingsLocation(capitalizeFirstLetter(locationFormatted)));
          break;
        case "braga":
          dispatch(setListingsLocation(capitalizeFirstLetter(locationFormatted)));
          break;
        case "coimbra":
          dispatch(setListingsLocation(capitalizeFirstLetter(locationFormatted)));
          break;
        default:
          break;
      }
      navigate("/listings");
    }
    else {
      console.log("Invalid location:", location);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const isLocationValid = (location) => {
    const locationValue = location.toLowerCase();

    if (
      locationValue === "lisboa" ||
      locationValue === "lisbon" ||
      locationValue === "porto" ||
      locationValue === "faro" ||
      locationValue === "braga" ||
      locationValue === "coimbra"
    ) {
      return true;
    }
    else {
      return false;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };


  return (
    <>
      <div className="banner-home">
        <Navigator />
        <div className="align-center">
          <div className="align-center search-div">
            <img src={logo} className="unlockit-logo" alt="unlockit-logo" />
            <p className="text-home-1">
              The smartest way to rent a property
            </p>
            <p className="text-home-2">
              Where would you like to rent your dream property?
            </p>
            <div className="search-bar-home">
              <Form className="d-flex form search-bar-form" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search location"
                  className="me-2 inner-form"
                  aria-label="Search"
                  value={listings.location}
                  onChange={(event) => dispatch(setListingsLocation((event.target.value)))}
                  onKeyDown={handleKeyDown}
                />
                <button className="button-search" type="submit">
                  <span ><BsSearch className="icon-search" /></span>
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};