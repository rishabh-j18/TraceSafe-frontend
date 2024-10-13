import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../services/apiCalls';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const {name, username, email, mobile, password, confirmPassword } = formData;
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if(!name || name.length<3){
        toast.error('Name must be more than or equal to 3 characters');
        return false; 
    }

    if (!usernameRegex.test(username)) {
      toast.error('Username must be at least 3 characters long and contain uppercase, lowercase, and a digit.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      toast.error('Password must contain uppercase, lowercase, and a digit.');
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }
    if (!mobileRegex.test(mobile)) {
      toast.error('Mobile number must be 10 digits.');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return false;
    }
    return true;
  };

  const userData = {name:formData.name, username:formData.username, email:formData.email, mobile:formData.mobile, password:formData.password};

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
        try{
            const response = await createUser(userData);
            if(response.status===200)
            {
                console.log('Form data:', formData);
                toast.success('Signup successful!');
                setFormData({
                  name: '',
                  username: '',
                  email: '',
                  mobile: '',
                  password: '',
                  confirmPassword: ''

                });
                navigate('/login');

                
            }
            else{
                toast.error('Error occured, Try again');


            }
        }
        catch(error)
        {
            console.error('Error',error.message);

        }
    }
  };

  return (
    <Box>

    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh', backgroundColor: '#f5f5f5',padding:"15px"}}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '400px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
        <Typography variant="h5" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Sign Up
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Name" name="name" variant="outlined" value={formData.name} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" name="username" variant="outlined" value={formData.username} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" variant="outlined" value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Mobile Number" name="mobile" variant="outlined" value={formData.mobile} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" name="password" type="password" variant="outlined" value={formData.password} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" variant="outlined" value={formData.confirmPassword} onChange={handleChange} />
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ marginTop: '20px' }}>
            Sign Up
          </Button>
        </form>
        <ToastContainer position="top-right" />
      </motion.div>
    </Box>
          </Box>
  );
};

export default SignupPage;
