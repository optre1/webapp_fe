import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const TokenLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Send POST request to the server
    fetch('/api/auth/loginWithCookie', {
      method: 'GET'
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.success != null && data.success == true) {
          navigate('/dashboard')
        } else {
          console.log(data.message)
          navigate('/login')
        }
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/login')
      });
  }, []);

  return (
    <div>

    </div>
  );
};

export default TokenLogin;
