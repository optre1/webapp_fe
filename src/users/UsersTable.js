import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import './UsersTable.css'
const UsersTable = () => {

    const navigate = useNavigate();
    const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([])
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = () => {
        setLoading(true);
        fetch('/api/users/get')
            .then(response => response.json())
            .then(data => {
                if (data.success != null && data.success === false) {
                    console.log(data.message)
                    setLoading(false);
                    return
                }

                setFetchedUsers(data.message)
                setFilteredUsers(data.message)
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    const handleCheckboxChange = (id) => {
        let updatedSelectedUsers;

        if (selectedUsers && selectedUsers.includes(id)) {
            // If the task is already selected, remove it from the selectedTasks array
            updatedSelectedUsers = selectedUsers.filter(item => item !== id);
        } else {
            // If the task is not selected, add it to the selectedTasks array
            updatedSelectedUsers = selectedUsers ? [...selectedUsers, id] : [id];
        }

        // Update the selectedTasks state
        setSelectedUsers(updatedSelectedUsers);

        // Enable or disable the delete button based on the length of selectedTasks
        setIsDeleteButtonEnabled(updatedSelectedUsers.length > 0);
    }
    const handleAddUser = () => {
        navigate('/users/create');
    }
    const handleDeleteUser = () => {
        fetch('/api/users/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedUsers }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                fetchUsers()
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });
    };
    const handleSearch = (e) => {
        const { value } = e.target;
        if (value === '') {
            setFilteredUsers(fetchedUsers)
            return
        }
        const filteredUsers = fetchedUsers.filter(user => user.userName.toLowerCase().includes(value.toLowerCase()))
        setFilteredUsers(filteredUsers)
    };
    return (
        <div className='task-container' >
        <button className='addTask-button' onClick={handleAddUser}>Add User</button>
            <button className='deleteTask-button' disabled={!isDeleteButtonEnabled} onClick={handleDeleteUser}>Delete User</button>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
            <table>
                <thead style={{ position: 'sticky', top: 0 }}>
                    <tr>
                        <th className='tableHeader'></th>
                        <th className='tableHeader'>Username</th>
                        <th className='tableHeader'>Is Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr><td colSpan='3'><BeatLoader color={'#1e90ff'} loading={loading} /></td></tr> : filteredUsers.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td><input type='checkbox' onChange={() => handleCheckboxChange(user._id)} disabled={user.builtIn}/></td>
                                <td>{user.userName}</td>
                                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            <div className='search-container'>
      <input type='text' placeholder='Search users...' onChange={handleSearch} />
    </div>
        </div>
    );
};

export default UsersTable;