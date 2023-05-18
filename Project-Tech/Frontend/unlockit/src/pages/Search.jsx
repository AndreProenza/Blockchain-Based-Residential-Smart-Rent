import logo from "../assets/log.svg"
import { Navigator } from "../components/Navigator";
import Form from 'react-bootstrap/Form';
import { BsSearch } from "react-icons/bs";

import '../components-css/Search.css';

export const Search = () => {
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
              <Form className="d-flex form search-bar-form">
                <Form.Control
                  type="search"
                  placeholder="Search location"
                  className="me-2 inner-form"
                  aria-label="Search"
                />
                <button className="button-search">
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