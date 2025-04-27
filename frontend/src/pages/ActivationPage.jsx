import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const server = process.env.REACT_APP_ENDPOINT_API;

const ActivationPage = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log(res.data.message);

       
          setTimeout(() => {
            navigate("/login"); 
          }, 2000); 

        } catch (err) {
          console.log(err.response.data.message);
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token, navigate]);

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
      {
        error ? (
          <p className='text-red-800'>Your token is expired</p>
        ) : (
          <p className='text-green-800'>Your Account has been created successfully! Redirecting to login...</p>
        )
      }
    </div>
  );
};

export default ActivationPage;
