import logo from "../assets/unlockit-logo.png"
import { Button, Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import Auth from '../auth/Auth';
import { Load } from '../pages/Load';
import { ModalLoadWaiting } from '../components/ModalLoadWaiting';
import UserEndpoint from '../endpoints/UserEndpoint';
import BlockchainEndpoint from '../endpoints/BlockchainEndpoint';
import axios from "axios";

import '../components-css/Login.css';

export const Login = () => {

    const navigate = useNavigate();

    const signupBlockchainOrg1Url = BlockchainEndpoint.signupBlockchainOrg1ServerUrl;
    const loginBlockchainOrg1Url = BlockchainEndpoint.loginBlockchainOrg1ServerUrl;

    const loginUrl = UserEndpoint.login;
    const deleteUserByIdUrl = UserEndpoint.deleteById;
    const isLoggedInUrl = UserEndpoint.isLoggedIn;
    const getUserIdUrl = UserEndpoint.getUserId;

    const [loading, setLoading] = useState(true);
    const [loadingWaiting, setLoadingWaiting] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            setLoadingWaiting(true);
            console.log("User: ", codeResponse);
            Auth.setTokenToSessionStorage(codeResponse.access_token);
            await handleLogin(codeResponse.access_token);

            const userId = await getUserId();
            if (userId === null) {
                setLoadingWaiting(false);
                return;
            }

            try {
                /* ----- TEST ----- */
                // const isSignedUpToBlockchain = await signupToBlockchain(userId, userId);
                // navigate("/search");
                /* ---------------- */
                
                let isLoggedInBlockchain = await loginToBlockchain(userId);

                if (!isLoggedInBlockchain) {
                    const isSignedUpToBlockchain = await signupToBlockchain(userId, userId);

                    if (!isSignedUpToBlockchain) {
                        await deleteUser(userId);
                        Auth.removeTokenFromSessionStorage();
                        alert("Blockchain Unavailable - Signup");
                        return;
                    }
                    isLoggedInBlockchain = await loginToBlockchain(userId);
                    if (!isLoggedInBlockchain) {
                        Auth.removeTokenFromSessionStorage();
                        alert("Blockchain Unavailable - Login");
                        return;
                    }
                    navigate("/search");
                }
                else {
                    navigate("/search");
                }
            } catch (error) {
                Auth.removeTokenFromSessionStorage();
                console.error("Error signing up to blockchain:", error);
                alert("Blockchain Unavailable");
            }
            finally {
                setLoadingWaiting(false);
            }
        },
        onError: (error) => {
            setLoadingWaiting(false);
            Auth.removeTokenFromSessionStorage();
            console.log('Login Failed:', error);
            alert("Login Failed");
        },
        isSignedIn: true,
    });

    const signupToBlockchain = async (username, password) => {
        try {
            const url = signupBlockchainOrg1Url;
            const data = {};

            const response = await axios.post(url, data, Auth.authAndUserCredentialsHeader(username, password));
            console.log('Status:', response.status);
            console.log('response.data:', await response.data);
            return true
        } catch (error) {
            console.error(error);
            console.error(error.response.data);
            return false;
        }
    }

    const loginToBlockchain = async (username) => {
        try {
            const url = loginBlockchainOrg1Url;
            const data = {};

            const response = await axios.post(url, data, Auth.authAndUsernameHeader(username));
            console.log('Status:', response.status);
            console.log('response.data:', await response.data);
            return true
        } catch (error) {
            console.error(error);
            console.error(error.response.data);
            return false;
        }
    }

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

    const deleteUser = async (userId) => {
        try {
            const url = deleteUserByIdUrl + userId;
            const response = await axios.delete(url, Auth.authHeader());
            console.log("Status: ", response.status);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserId = async () => {
        try {
            const url = getUserIdUrl;
            const response = await axios.get(url, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("Data: ", response.data);
            return response.data.id
        
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return null;
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
            <ModalLoadWaiting show={loadingWaiting} />
        </div>
    );
};
