import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import '../components-css/Navigator.css';

export const Navigator = () => {
    return (
        <div>
            <Navbar className="nav" bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home" id="unlockit-symbol">Unlockit</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="listings">Listings</Nav.Link>
                            <Nav.Link href="contracts">Contracts</Nav.Link>
                            <Nav.Link href="profile">Profile</Nav.Link>
                        </Nav>
                        <Button variant="outline-light" className="logout-btn" href='/logout'>Logout</Button>{' '}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}