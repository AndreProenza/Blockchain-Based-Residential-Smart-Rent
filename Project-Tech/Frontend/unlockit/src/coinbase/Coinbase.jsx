import React from 'react';
import axios from 'axios';

class Coinbase extends React.Component {

    static createPayment = () => {

        let data = JSON.stringify({
            "name": "Rental Payment",
            "description": "Rental payment for residential property use",
            "pricing_type": "fixed_price",
            "local_price": {
                "amount": "0.1",
                "currency": "EUR"
            },
            "metadata": {
                "customer_id": "Unlockit_IO",
                "customer_name": "Unlockit"
            }
        });

        let config = {
            method: 'post',
            url: 'https://api.commerce.coinbase.com/charges',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CC-Version': process.env.REACT_APP_COINBASE_API_VERSION,
                'X-CC-Api-Key': process.env.REACT_APP_COINBASE_API_KEY
            },
            data: data
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log(JSON.stringify(response.data.data.hosted_url));
            })
            .catch((error) => {
                console.log(error);
            });
    };

}

export { Coinbase };