import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUsers from './CreateUsers';
import ViewUsers from './ViewUsers';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import UpdateUserForm from './UpdateUserForm';
import './App.css';

const App = () => {
  const initialUsers = []; // Initial empty array for users
  const [users, setUsers] = useState(initialUsers); // State to store users
  const [editingUser, setEditingUser] = useState(null); // State to track user being edited

  // Function to add a new user
  const addUser = (newUser) => {
    newUser.id = Date.now(); // Assign unique ID
    setUsers([...users, newUser]); // Add new user to users array
  };

  // Function to delete a user by ID
  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id)); // Filter out user by ID
  };

  // Function to edit an existing user
  const editExistingUser = (updatedUser) => {
    const updatedUsers = users.map(user =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers); // Update users array with updated user data
    setEditingUser(null); // Clear editingUser state
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setEditingUser(null); // Clear editingUser state
  };

  return (
    <Router>
      <div>
        <NavBar />  
        <Routes>
          <Route path="/" element={<ViewUsers users={users} onDeleteUser={deleteUser} onEditUser={setEditingUser} />} />
          <Route path="/create" element={<CreateUsers addUser={addUser} />} />
          <Route path="/edit/:id" element={<UpdateUserForm user={editingUser} onUpdateUser={editExistingUser} onCancel={cancelEdit} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
