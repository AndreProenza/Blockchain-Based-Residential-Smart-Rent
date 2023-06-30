import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Auth from '../auth/Auth';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import '../components-css/NavigatorInitial.css';

export const NavigatorInitial = () => {

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
                    <Navbar.Brand href="/">Unlockit</Navbar.Brand>
                    <Button className="logout-btn" variant="outline-light" href="/login">Login</Button>{' '}
                </Container>
            </Navbar>
        </div>
    );
}