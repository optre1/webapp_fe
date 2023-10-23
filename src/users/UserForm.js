import './UserForm.css'
import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const navigate = useNavigate();
    const initialUserData = {
        userName: '',
        password: '',
        isAdmin: false
    };
    const [userData, setUserData] = useState(initialUserData);
    const [responseMessage, setResponseMessage] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New User Data:', userData);
        let localData = userData
        localData.password = CryptoJS.SHA256(localData.password).toString(CryptoJS.enc.Hex);
        fetch('/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userData }),
        })
            .then(response => response.json())
            .then(data => {
                setResponseMessage(data.success ? 'Success' : data.msessage);
                console.log(data);
                setUserData(initialUserData);
            })
            .catch(error => {
                setResponseMessage('Failed');
                console.error('Error:', error);
            });

    };
    const handleBack = (e) => {
        navigate('/dashboard')
    }

    return (
        <div className='task-form'>
            <h2>Create a New User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type='text' name='userName' value={userData.userName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type='password' name='password' value={userData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Is Admin:</label>
                    <input type='checkbox' name='isAdmin' value={userData.isAdmin} onChange={handleChange} />
                </div>
                <button type='submit'>Create User</button>
                {responseMessage && <div className='error-message'>{responseMessage}</div>}
                <button onClick={handleBack}>Back</button>
            </form>
        </div>
    );
};

export default UserForm;