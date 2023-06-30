import logo from "../assets/unlockit-logo.png"
import { Button, Container } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import '../components-css/Error.css';

export const Error = () => {

    const navigate = useNavigate();

    return (
        <div className="error-banner">
            <Container className="container-error">
                <Card className="container-card-error">
                    <Button variant="primary" className="back-button-error" onClick={() => navigate("/search")}>Back</Button>{' '}
                    <Card.Body>
                        <Card.Img variant="top" src={logo} className="unlockit-logo-error" alt="unlockit-logo" />
                        <Card.Title className="unlockit-card-title">Page not found</Card.Title>
                        <Card.Text className="unlockit-card-text">
                            We're sorry, we couldn't find
                            <br />
                            the page you requested.
                        </Card.Text>
                        <Card.Text className="unlockit-card-error-contact">
                            If you feel that something is missing, please <a className="error-contact" href="https://unlockit.io/"> contact us.</a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};