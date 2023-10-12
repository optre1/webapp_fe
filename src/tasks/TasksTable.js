import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import './TasksTable.css'

const TasksTable = () => {

 const navigate = useNavigate();
 const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);
 const [selectedTasks, setSelectedTasks] = useState([])
 const [fetchedTasks, setFetchedTasks] = useState([]);
 const [loading, setLoading] = useState(false);
const [filteredTasks, setFilteredTasks] = useState([]);

const fetchTasks = () => {
  setLoading(true);
fetch('/api/tasks/get')
.then(response=>response.json())
.then(data =>{
  if(data.success !=null && data.success === false) {
    console.log(data.message)
    setLoading(false);
    return
  }
  setFetchedTasks(data.message)
  setFilteredTasks(data.message)
  setLoading(false);
})
.catch(error => {
  console.error('Error fetching data:', error);
  setLoading(false);
});
};

 useEffect(() => {
  fetchTasks()
 }, []);



 const handleCheckboxChange = (id) => {
  let updatedSelectedTasks;
  
  if (selectedTasks && selectedTasks.includes(id)) {
    // If the task is already selected, remove it from the selectedTasks array
    updatedSelectedTasks = selectedTasks.filter(item => item !== id);
  } else {
    // If the task is not selected, add it to the selectedTasks array
    updatedSelectedTasks = selectedTasks ? [...selectedTasks, id] : [id];
  }

  // Update the selectedTasks state
  setSelectedTasks(updatedSelectedTasks);

  // Enable or disable the delete button based on the length of selectedTasks
  setIsDeleteButtonEnabled(updatedSelectedTasks.length > 0);
};
  const handleAddTask = () => {
    navigate('/tasks/create');
  };
  const handleDeleteTask = () => {
    fetch('/api/tasks/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedTasks }),
    })
      .then(response => response.json())
      .then(data => {
        // Set the response message in state
        console.log(data); // Handle the server response here
      })
      .catch(error => {
        console.error('Error:', error);
      });
      fetchTasks()
  };

  const handleSearch = (e) => {
    const {value} = e.target;
    if (value === '') {
      setFilteredTasks(fetchedTasks)
      return
  }
    const filteredTasks = fetchedTasks.filter(task => 
      task.name.toLowerCase().includes(value.toLowerCase()) ||
      task.description.toLowerCase().includes(value.toLowerCase()) ||
      task.dealName.toLowerCase().includes(value.toLowerCase()) ||
      task.assigneeName.toLowerCase().includes(value.toLowerCase()) ||
      task.status.toLowerCase().includes(value.toLowerCase()) ||
      task.priority.toLowerCase().includes(value.toLowerCase()) ||
      new Date(task.dueDate).toLocaleString().toLowerCase().includes(value.toLowerCase())
      )
    setFilteredTasks(filteredTasks)
  }
  return (
    <div className="task-container">
   
    <button className="addTask-button right" onClick={handleAddTask}>Add Task</button>
    <button className="deleteTask-button" onClick={handleDeleteTask} disabled={!isDeleteButtonEnabled}>Delete Task</button>
  
   <div style={{ height: '400px', overflowY: 'scroll' }}>
    <table>
      <thead>
        <tr>
          <th className='tableHeader'></th>
          <th className='tableHeader'>Name</th>
          <th className='tableHeader'>Description</th>
          <th className='tableHeader'>Deal</th>
          <th className='tableHeader'>Assignee</th>
          <th className='tableHeader'>Status</th>
          <th className='tableHeader'>Priority</th>
          <th className='tableHeader'>Due Date</th>
        </tr>
      </thead>
      <tbody>
      {loading ? <tr><td colSpan='3'><BeatLoader color={'#1e90ff'} loading={loading} /></td></tr> : filteredTasks.map((task, index) => {
          return(
          <tr key={index}>
            <td><input type="checkbox" onChange={() => handleCheckboxChange(task._id)} /></td>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.dealName}</td>
            <td>{task.assigneeName}</td>
            <td>{task.status}</td>
            <td>{task.priority}</td>
            <td>{new Date(task.dueDate).toLocaleString()}</td>
          </tr>
          )
    })}
      </tbody>
    </table>
    
    </div>
    <div className='search-container'>
      <input type='text' placeholder='Search tasks...' onChange={handleSearch} />
    </div>
    </div>
  );
};

export default TasksTable;