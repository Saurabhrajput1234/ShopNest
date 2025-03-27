import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const server = process.env.REACT_APP_ENDPOINT_API;

const SellerActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        const activationEmail = async () => {
            if (!activation_token) return;
            try {
                await axios.post(`${server}/shop/activation`, { activation_token });
            } catch (err) {
                console.error(err.response?.data?.message || "Activation failed");
                setError(true);
            }
        };

        activationEmail();
    }, [activation_token]); // Added dependency

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {error ? (
                <p className="text-red-800">Your token has expired</p>
            ) : (
                <p className="text-green-800">Your account has been created successfully!</p>
            )}
        </div>
    );
};

export default SellerActivationPage;
