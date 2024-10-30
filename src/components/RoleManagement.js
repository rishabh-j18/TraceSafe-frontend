// src/components/RoleManagement.js
import React, { useState } from 'react';
import axios from 'axios';

const RoleManagement = () => {
    const [account, setAccount] = useState('');

    const addUser = async () => {
        try {
            const response = await axios.post('/api/roles/add', { account });
            console.log('User added:', response.data);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const removeUser = async () => {
        try {
            const response = await axios.post('/api/roles/remove', { account });
            console.log('User removed:', response.data);
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    const checkUser = async () => {
        try {
            const response = await axios.post('/api/roles/isUser', { account });
            console.log('Is User:', response.data.isUser);
        } catch (error) {
            console.error('Error checking user:', error);
        }
    };

    return (
        <div>
            <h2>Role Management</h2>
            <input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="Enter Ethereum Address"
            />
            <button onClick={addUser}>Add User</button>
            <button onClick={removeUser}>Remove User</button>
            <button onClick={checkUser}>Check User Role</button>
        </div>
    );
};

export default RoleManagement;
