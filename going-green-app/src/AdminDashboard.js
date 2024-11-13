// AdminDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({ userId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users (Admin only)
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:3000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>All Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            Email: {user[1]} - {user[2] === 1 ? 'Admin' : 'User'}
          </li>
        ))}
      </ul>
      {/* Add more admin-specific functionalities here */}
    </div>
  );
};

export default AdminDashboard;
