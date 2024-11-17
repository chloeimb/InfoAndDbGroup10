// AdminDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Switch, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, Typography, Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddArticle from './AddArticle'; // Import the AddArticle component

const AdminDashboard = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null); // User being edited
  const [openDialog, setOpenDialog] = useState(false); // For edit dialog
  const [newEmail, setNewEmail] = useState(''); // New email input

  const [customArticles, setCustomArticles] = useState([]); // State for custom articles

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
    fetchCustomArticles(); // Fetch custom articles when the component mounts
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
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

  // Fetch custom articles
  const fetchCustomArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/articles');
      setCustomArticles(response.data);
    } catch (error) {
      console.error('Error fetching custom articles:', error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Refresh user list
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Toggle admin status
  const toggleAdminStatus = async (id, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/users/${id}/admin-status`,
        { isAdmin: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  // Open edit dialog
  const openEditDialog = (user) => {
    setEditUser(user);
    setNewEmail(user[1]); // Assuming EMAIL is at index 1
    setOpenDialog(true);
  };

  // Close edit dialog
  const closeEditDialog = () => {
    setOpenDialog(false);
    setEditUser(null);
    setNewEmail('');
  };

  // Update user email
  const updateUserEmail = async () => {
    try {
      await axios.put(
        `http://localhost:3000/users/${editUser[0]}/email`,
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh user list
      fetchUsers();
      closeEditDialog();
    } catch (error) {
      console.error('Error updating user email:', error);
    }
  };

  // Delete an article
  const deleteArticle = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axios.delete(`http://localhost:3000/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Refresh article list
        fetchCustomArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* User Management Section */}
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => {
              const userIdInRow = user[0];
              const email = user[1];
              const isAdmin = user[2] === 1;

              // Convert IDs to numbers for accurate comparison
              const loggedInUserId = Number(userId);
              const currentUserIdInRow = Number(userIdInRow);

              // Debugging logs
              // console.log(`Logged-in User ID: ${loggedInUserId}, Row User ID: ${currentUserIdInRow}`);

              return (
                <TableRow key={index}>
                  <TableCell>{userIdInRow}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    <Switch
                      checked={isAdmin}
                      onChange={() => toggleAdminStatus(userIdInRow, isAdmin)}
                      color="primary"
                      disabled={currentUserIdInRow === loggedInUserId} // Prevent admin from changing their own status
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => openEditDialog(user)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteUser(userIdInRow)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Dialog */}
      <Dialog open={openDialog} onClose={closeEditDialog}>
        <DialogTitle>Edit User Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the email address for User ID {editUser && editUser[0]}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={updateUserEmail} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Article Section */}
      <Typography variant="h5" gutterBottom>
        Add New Article
      </Typography>
      <AddArticle onArticleAdded={fetchCustomArticles} /> {/* Pass a prop to refresh articles after adding */}

      {/* Manage Articles Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Manage Articles
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Article ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customArticles.map((article) => (
              <TableRow key={article.articleId}>
                <TableCell>{article.articleId}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>{new Date(article.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  {/* Add Edit functionality if needed */}
                  <IconButton onClick={() => deleteArticle(article.articleId)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;
