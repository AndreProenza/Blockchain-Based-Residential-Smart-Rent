import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Auth from '../auth/Auth';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import '../components-css/Navigator.css';

export const Navigator = () => {

    const navigate = useNavigate();

    const logout = () => {
        googleLogout();
        Auth.removeTokenFromSessionStorage();
        console.log("Logout sucessfully");
        navigate("/");
    };

    return (
        <div>
            <Navbar className="nav" bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/search" id="unlockit-symbol">Unlockit</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/search">Search</Nav.Link>
                            <Nav.Link href="/listings">Listings</Nav.Link>
                            <Nav.Link href="/advertise">Advertise</Nav.Link>
                            <Nav.Link href="/contracts">Contracts</Nav.Link>
                            <Nav.Link href="/properties">Properties</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                        </Nav>
                        <Button variant="outline-light" className="logout-btn" onClick={() => logout()}>Logout</Button>{' '}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}