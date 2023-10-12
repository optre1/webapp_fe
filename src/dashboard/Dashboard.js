import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

import TasksTable from '../tasks/TasksTable'
import DealsTable from '../deals/DealsTable';
import UsersTable from '../users/UsersTable';

import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [uid, setUid] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('deals');
  useEffect(() => {
    
   fetch('/api/dashboard')
      .then(response => response.json())
      .then(data => {
        if(data.success !=null && data.success === true) {
         //fetch more data
        setUsername(data.message.userName)
        setIsAdmin(data.message.isAdmin)
        setUid(data.message._id.toString())
        } else {
          navigate('/login')
          return
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        navigate('/login')
        return
      });
  }, [navigate]);
  
  const handleLogout = () => {
    fetch('/api/auth/logout')
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    navigate('/');
  };


  return (
    <div className="dashboard">
   <div className="user-info-container ml-auto">
        {username && (
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Welcome, <span>{username}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div >
      <div className="container">
      <Tabs
        id="dashboard-tabs"
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
      >
        <Tab eventKey="deals" title="Deals Section">
          <DealsTable/>
        </Tab>
        <Tab eventKey="tasks" title="Tasks Section">
          <TasksTable/> 
        </Tab>
        {isAdmin && (
          <Tab eventKey="userManagement" title="User Management Section">
            <UsersTable/>
          </Tab>
        )}
      </Tabs>
      </div>
    </div>
  );

 
};
  

export default Dashboard;