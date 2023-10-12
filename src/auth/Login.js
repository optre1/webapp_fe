import React, { useState, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hashedPass = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    // Send POST request to the server
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: hashedPass }),
    })
      .then(response => response.json())
      .then(data => {
        // Set the response message in state
       if(data.success != null && data.success == true) {
        navigate('/dashboard')
      } else {
        setResponseMessage(data.message ? 'Success' : 'Failed');
      }
        console.log(data); // Handle the server response here
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
<div className="login-container">
<h2>Login</h2>
<form onSubmit={handleSubmit}>
  <div>
    <label>Username:</label>
    <input type="text" value={username} onChange={handleUsernameChange} />
  </div>
  <div>
    <label>Password:</label>
    <input type="password" value={password} onChange={handlePasswordChange} />
  </div>
  <button type="submit">Login</button>
</form>
{responseMessage && <div className="error-message">{responseMessage}</div>}
</div>
  );
};

export default Login;
