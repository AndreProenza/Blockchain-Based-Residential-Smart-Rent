import logo from "../assets/unlockit-logo.png"
import { Button, Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import Auth from '../auth/Auth';
import { Load } from '../pages/Load';
import UserEndpoint from '../endpoints/UserEndpoint';
import axios from "axios";

import '../components-css/Login.css';

export const Login = () => {

    const navigate = useNavigate();

    const loginUrl = UserEndpoint.login;
    const isLoggedInUrl = UserEndpoint.isLoggedIn;

    const [loading, setLoading] = useState(true);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log("User: ", codeResponse);
            Auth.setTokenToSessionStorage(codeResponse.access_token)
            handleLogin(codeResponse.access_token);
            navigate("/search");
        },
        onError: (error) => console.log('Login Failed:', error),
        isSignedIn: true,
    });


    const handleLogin = async (accessToken) => {
        try {
            const response = await axios.post(loginUrl, null, Auth.loginAuthHeader(accessToken));
            console.log("Status: ", response.status);
            //console.log("Data: ", response.data);
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                if (Auth.getTokenFromSessionStorage() !== null) {
                    const response = await axios.get(isLoggedInUrl, Auth.authHeader());
                    console.log("Status: ", response.status);
                    if (response.status === 200) {
                        navigate("/search");
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        isLoggedIn();

    }, [isLoggedInUrl, navigate]);

    if (loading) {
        return <Load />;
    }

    return (
        <div className="login-banner">
            <Container className="container-login">
                <Card className="container-card-login">
                    <Button variant="primary" className="back-button-login" onClick={() => navigate("/")}>Back</Button>{' '}
                    <Card.Body>
                        <Card.Img variant="top" src={logo} className="unlockit-logo-login" alt="unlockit-logo" />
                        <Card.Title className="unlockit-card-title">Welcome</Card.Title>
                        <Card.Text className="unlockit-card-text">
                            Sign in to Unlockit to continue
                            <br />
                            to Unlockit.
                        </Card.Text>
                        <Card.Text className="unlockit-card-google">
                            Login with Google
                        </Card.Text>
                        <Button variant="primary" className="google-button-login" onClick={() => login()}>
                            <FcGoogle /> Login
                        </Button>
                        <Card.Text className="unlockit-card-google-create">
                            Don't have a Google account? <a className="google-create-account" href="https://accounts.google.com/signup">Create one.</a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};
