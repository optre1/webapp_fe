import 'react-datepicker/dist/react-datepicker.css';
import './TaskForm.css'

import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {useNavigate} from 'react-router-dom';

const TaskForm = () => {
  const navigate = useNavigate();
 
  const initialTaskData  = {
    name: '',
    description: '',
    dealId: '',
    assignee: '',
    status: 'open',
    priority: '',
    dueDate: new Date()  // Initialize dueDate with the current date
  };
  const [taskData, setTaskData] = useState(initialTaskData);

  const [responseMessage, setResponseMessage] = useState('')
  const [availableUsers, setAvailableUsers] = useState([])
  const [availableDeals, setAvailableDeals] = useState([])
  useEffect(() => {
   
   
    fetch('/api/users/get')
      .then(response => response.json())
      .then(data => {
        const availableUsers = []
        const users = data.message
        users.forEach(user => {
          availableUsers.push({"name": user.userName, "id": user._id})
          console.log(data)
      })
      setAvailableUsers(availableUsers)
    })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      fetch('/api/deals/get')
      .then(response => response.json())
      .then(data => {
        const availableDealsLocal = []
        const deals = data.message
        deals.forEach(deal => {
          availableDealsLocal.push({"name": deal.name, "id": deal._id})
          console.log(data)
      })
      setAvailableDeals(availableDealsLocal)
    })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleChange = (e) => {
    const {name, value} = e.target;
    setTaskData({...taskData, [name]: value});
  };

  const handleDateChange = (date) => {
    setTaskData({...taskData, dueDate: date});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Task Data:', taskData);
    // Perform actions to save the task data (send to API, update state, etc.)
    fetch('/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskData }),
      })
        .then(response => response.json())
        .then(data => {
          // Set the response message in state
        
          setResponseMessage(data.success ? 'Success' : 'Failed');
          console.log(data); // Handle the server response here
          setTaskData(initialTaskData);
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
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Name:</label>
          <input type='text' name='name' value={taskData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name='description' value={taskData.description} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Deal ID:</label>
          <select name="dealId" value={taskData.dealId} onChange={handleChange} required>
            <option value="">Select a deal</option>
            {availableDeals.map(deal => (
              <option key={deal.id} value={deal.id}>{deal.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Assignee:</label>
          <select name="assignee" value={taskData.assignee} onChange={handleChange} required>
            <option value="">Select a user</option>
            {availableUsers.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Priority:</label>
          <input type='text' name='priority' value={taskData.priority} onChange={
    handleChange} />
        </div>
        <div>
          <label>Due Date:</label>
          <DatePicker
  selected = {taskData.dueDate} onChange = {handleDateChange} dateFormat =
      'yyyy-MM-dd'
  showMonthDropdown
  showYearDropdown
            dropdownMode='select'
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
      {responseMessage && <div className="error-message">{responseMessage}</div>}
      <form onSubmit={handleBack}>
      <button type="submit" >Back</button>
      </form>
    
    </div>
  );
};

export default TaskForm;
