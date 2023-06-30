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

    static expireTimeLimit = 15; // Seconds

}

export default Auth;