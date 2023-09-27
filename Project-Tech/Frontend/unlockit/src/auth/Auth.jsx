import React from 'react';

class Auth extends React.Component {

    static setTokenToSessionStorage(token) {
        sessionStorage.setItem('token', token);
    };

    static getTokenFromSessionStorage() {
        return sessionStorage.getItem('token');
    };

    static removeTokenFromSessionStorage() {
        sessionStorage.removeItem('token');
    };

    static loginAuthHeader(accessToken) {
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
    };

    static authHeader() {
        const accessToken = this.getTokenFromSessionStorage();
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
    };

    static authAndUserCredentialsHeader(username, password) {
        const accessToken = this.getTokenFromSessionStorage();
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                username: username,
                password: password,
            },
        };
    };

    static authAndUsernameHeader(username) {
        const accessToken = this.getTokenFromSessionStorage();
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                username: username,
            },
        };
    };

    static expireTimeLimit = 15; // Seconds

}

export default Auth;