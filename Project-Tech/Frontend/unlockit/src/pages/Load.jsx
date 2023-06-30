import { Container } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import logo from "../assets/unlockit-logo.png"

import '../components-css/Load.css';

export const Load = () => {
    return (
        <div className="load-banner">
            <Container className="container-load">
                <Card className="container-card-load">
                    <Card.Img variant="top" src={logo} className="unlockit-logo-load" alt="unlockit-logo" />
                    <Card.Text className="unlockit-card-title">Unlockit</Card.Text>
                    <Spinner animation="border" variant="primary" />
                </Card>
            </Container>
        </div>
    );
};