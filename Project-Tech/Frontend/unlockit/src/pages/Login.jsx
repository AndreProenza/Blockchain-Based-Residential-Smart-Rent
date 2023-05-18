import logo from "../assets/unlockit-logo.png"
import { Button, Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import Card from 'react-bootstrap/Card';

import '../components-css/Login.css';

export const Login = () => {
    return (
        <div className="login-banner">
            <Container className="container-login">
                <Card className="container-card-login">
                    <Card.Body>
                        <Card.Img variant="top" src={logo} className="unlockit-logo-login" alt="unlockit-logo" />
                        <Card.Title className="unlockit-card-title">Welcome</Card.Title>
                        <Card.Text className="unlockit-card-text">
                            Sign in to Unlockit to continue
                            <br/>
                            to Unlockit.
                        </Card.Text>
                        <Card.Text className="unlockit-card-google">
                            Login with Google
                        </Card.Text>
                        <Button variant="primary" className="google-button-login"><FcGoogle /> Login</Button>
                        <Card.Text className="unlockit-card-google-create">
                            Don't have a Google account? <a className="google-create-account" href="https://accounts.google.com/signup">Create one.</a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};
