import React, { useState, 
    // useContext
 } from 'react';
import { Box, TextField, Typography, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiCalls';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
  const {login}=useAuth(); // Get the login function from context
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const user = { username: formData.username, password: formData.password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(user);

      if (response.status === 200) {
        const { token, user: userData } = response.data;
        toast.success('Login successful');
        console.log(userData);
        // Save token and user data in context and localStorage
        login(userData, token);
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'Error occurred, try again');
      }
    } catch (error) {
      toast.error('Login failed, please check your credentials and try again');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', backgroundColor: '#f5f5f5', margin: '10px' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '400px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <Typography variant="h5" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Login
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            value={formData.username}
            onChange={handleInputChange}
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange}
            sx={{ marginBottom: '20px' }}
          />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ marginBottom: '20px' }}>
            Login
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href="/forgot-password" variant="body2">
              Forgot password?
            </Link>
            <Link href="/signup" variant="body2">
              Don't have an account?
            </Link>
          </Box>
        </form>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
