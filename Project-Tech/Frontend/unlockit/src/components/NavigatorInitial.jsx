import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import '../components-css/NavigatorInitial.css';

export const NavigatorInitial = () => {
    return (
        <div>
            <Navbar className="nav" bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">Unlockit</Navbar.Brand>
                    <Button className="logout-btn" variant="outline-light" href='/login'>Login</Button>{' '}
                </Container>
            </Navbar>
        </div>
    );
}