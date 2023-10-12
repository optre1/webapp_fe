import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {BeatLoader} from 'react-spinners';
// import './TasksTable.css'

const DealsTable = () => {

 const navigate = useNavigate();
 const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);
 const [selectedDeals, setSelectedTasks] = useState([])
 const [fetchedDeals, setFetchedDeals] = useState([]);
 const [loading, setLoading] = useState(false);
const [filteredDeals, setFilteredDeals] = useState([]);
 useEffect(() => {
  fetchDeals()
 }, []);

 const fetchDeals = () => {
    setLoading(true);
  fetch('/api/deals/get')
  .then(response=>response.json())
  .then(data =>{
    if(data.success !=null && data.success === false) {
      console.log(data.message)
      setLoading(false);
      return
    }
    setFetchedDeals(data.message)
    setFilteredDeals(data.message)
    setLoading(false);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    setLoading(false);
  });
 };
 const handleCheckboxChange = (id) => {
  let updatedSelectedDeals;
  
  if (selectedDeals && selectedDeals.includes(id)) {
    // If the task is already selected, remove it from the selectedTasks array
    updatedSelectedDeals = selectedDeals.filter(item => item !== id);
  } else {
    // If the task is not selected, add it to the selectedTasks array
    updatedSelectedDeals = selectedDeals ? [...selectedDeals, id] : [id];
  }

  // Update the selectedTasks state
  setSelectedTasks(updatedSelectedDeals);

  // Enable or disable the delete button based on the length of selectedTasks
  setIsDeleteButtonEnabled(updatedSelectedDeals.length > 0);
};
  const handleAddDeal = () => {
    navigate('/deals/create');
  };
  const handleDeleteDeal = () => {
    fetch('/api/deals/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedDeals: selectedDeals }),
    })
      .then(response => response.json())
      .then(data => {
        // Set the response message in state
        console.log(data); // Handle the server response here
      })
      .catch(error => {
        console.error('Error:', error);
      });
      fetchDeals()
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    if (value === '') {
        setFilteredDeals(fetchedDeals)
        return
    }
    const filteredDeals = fetchedDeals.filter(deal => 
      deal.name.toLowerCase().includes(value.toLowerCase()) ||
      deal.value.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredDeals(filteredDeals)
};
  return (
    <div className='task-container'>
    <button className='addTask-button' onClick={handleAddDeal}>Add Deal</button>
    <button className="deleteTask-button" onClick={handleDeleteDeal} disabled={!isDeleteButtonEnabled}>Delete Deal</button>
    <div style={{ height: '400px', overflowY: 'scroll' }}>
      <table>
         <thead style={{ position: 'sticky', top: 0 }}>
        <tr>
          <th className='tableHeader'></th>
          <th className='tableHeader'>Deal Name</th>
          <th className='tableHeader'>Deal Value</th>
          <th className='tableHeader'>Status</th>
        </tr>
      </thead>
      <tbody>
      {loading ? <tr><td colSpan='3'><BeatLoader color={'#1e90ff'} loading={loading} /></td></tr> : filteredDeals.map((deal, index) => {
        return (
          <tr key={index}>
            <td><input type="checkbox" onChange={() => handleCheckboxChange(deal._id)} /></td>
            <td>{deal.name}</td>
            <td>{deal.value} $</td>
            <td>{deal.status}</td>
          </tr>
      )
})}
      </tbody>
    </table>
    </div>
    <div className='search-container'>
      <input type='text' placeholder='Search deals...' onChange={handleSearch} />
    </div>
    </div>
  );
};

export default DealsTable;