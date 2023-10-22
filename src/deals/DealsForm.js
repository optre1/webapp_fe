import './DealsForm.css'

import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const DealsForm = () => {
  const navigate = useNavigate();
  const initialDealData  = {
    name: '',
    value: '',
    status: 'open'
  };
  const [dealData, setDealData] = useState(initialDealData);
  

  const [responseMessage, setResponseMessage] = useState('')
  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'value') {
      // Check if the input is a valid number and update the state accordingly
      if (/^[1-9]\d*$/.test(value)) {
        setDealData({ ...dealData, [name]: value });
      }
    } else {
      setDealData({ ...dealData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Deal Data:', dealData);
    // Perform actions to save the task data (send to API, update state, etc.)
    fetch('/api/deals/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dealData }),
      })
        .then(response => response.json())
        .then(data => {
          // Set the response message in state
          setResponseMessage(data.success ? 'Success' : 'Failed');
          console.log(data); // Handle the server response here
          setDealData(initialDealData);
        })
        .catch(error => {
            setResponseMessage( 'Failed');
          console.error('Error:', error);
        });
   
  };
  const handleBack = (e) => {
    navigate('/dashboard')
  }

  return (
    <div className='task-form'>
      <h2>Create a New Deal</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Name:</label>
          <input type='text' name='name' value={dealData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Value:</label>
          <textarea type='' name='value' value={dealData.value} onChange={handleChange} pattern="^[1-9]\d*$" required></textarea>
        </div>
        <button type="submit">Create Deal</button>
      </form>
      {responseMessage && <div className="error-message">{responseMessage}</div>}
      <form onSubmit={handleBack}>
      <button type="submit" >Back</button>
      </form>
    
    </div>
  );
};

export default DealsForm;
