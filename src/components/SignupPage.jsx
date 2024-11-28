import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../services/apiCalls';
import { useNavigate } from 'react-router-dom';
import WalletRoundedIcon from '@mui/icons-material/WalletRounded';
import Web3 from 'web3';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    account: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      toast.error("Non-Ethereum browser detected. Please install MetaMask.");
    }
    return provider;
  };

  const onConnect = async () => {
    const currentProvider = detectCurrentProvider();
    if (currentProvider) {
      try {
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const accounts = await web3.eth.getAccounts();
        setFormData(prev => ({ ...prev, account: accounts[0] }));
      } catch (error) {
        console.error(error);
        toast.error("Failed to connect to MetaMask.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const { name, username, email, mobile, password, confirmPassword, account } = formData;
    const isValid = name && username && email && mobile && password && confirmPassword && account;
    setIsFormValid(isValid);
  }, [formData]);

  const validateForm = () => {
    const { name, username, email, mobile, password, confirmPassword, account } = formData;
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!name || name.length < 3) return 'Name must be at least 3 characters long.';
    if (!usernameRegex.test(username)) return 'Username must contain uppercase, lowercase, and a digit.';
    if (!passwordRegex.test(password)) return 'Password must be 6 digits & contain uppercase, lowercase, and a digit.';
    if (!emailRegex.test(email)) return 'Please enter a valid email address.';
    if (!mobileRegex.test(mobile)) return 'Mobile number must be 10 digits.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    if (!account) return 'Enter wallet details';

    return null;
  };

  const userData = {
    name: formData.name,
    username: formData.username,
    email: formData.email,
    mobile: formData.mobile,
    account: formData.account,
    password: formData.password
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    const loadingToastId = toast.loading("Signing up...");

    try {
      console.log(userData);
      setLoading(true);
      const response = await createUser(userData);
      
      toast.dismiss(loadingToastId);
      
      if (response.status === 200) {
        toast.success('Signup successful!');
        setFormData({
          name: '',
          username: '',
          email: '',
          mobile: '',
          account: '',
          password: '',
          confirmPassword: ''
        });
        navigate('/login');
      } else {
        toast.error('Signup failed, please try again.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.dismiss(loadingToastId); 
      toast.error('An error occurred, please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f5f5', p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 400, padding: 20, backgroundColor: 'white', borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <Typography variant="h5" align="center" mb={2}>
          Sign Up
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {['name', 'username', 'email', 'mobile', 'password', 'confirmPassword'].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1).replace('Password', ' Password')}
                  name={field}
                  variant="outlined"
                  type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Wallet Address"
                name="account"
                variant="outlined"
                value={formData.account}
                disabled
                InputProps={{
                  endAdornment: (
                    <Button variant="contained" color="secondary" startIcon={<WalletRoundedIcon />} onClick={onConnect}>
                      Connect MetaMask
                    </Button>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isFormValid}
            sx={{ mt: 2 }}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </Button>
        </form>
        <ToastContainer position="top-right" />
      </motion.div>
    </Box>
  );
};

export default SignupPage;
