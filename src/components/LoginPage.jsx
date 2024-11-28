import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Link,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginUser, loginUserMeta } from "../services/apiCalls";
import { useAuth } from "../AuthContext";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import Web3 from "web3";

const LoginPage = () => {
  const { login } = useAuth(); // Auth context
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const detectProvider = () => {
    if (window.ethereum) {
      return window.ethereum;
    } else if (window.web3) {
      return window.web3.currentProvider;
    } else {
      toast.error("Non-Ethereum browser detected. Please install MetaMask.");
      return null;
    }
  };

  const handleMetaMaskLogin = async () => {
    const provider = detectProvider();
    if (provider) {
      try {
        await provider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Verify user with wallet address
        const response = await loginUserMeta({account});
        if (response.status === 200) {
          const { user: userData,token } = response.data;
          toast.success("MetaMask login successful!");
          login(userData, token);
          navigate("/dashboard");
        } else {
          toast.error(response.data.message || "Error occurred, try again");
        }
      } catch (error) {
        toast.error("MetaMask login failed. Ensure MetaMask is unlocked.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.status === 200) {
        const { token, user: userData } = response.data;
        toast.success("Login successful");
        login(userData, token);
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Error occurred, try again");
      }
    } catch (error) {
      toast.error("Login failed, please check your credentials and try again");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "400px",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", textAlign: "center" }}
        >
          Login
        </Typography>

        {/* Login with Username and Password */}
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            value={formData.username}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginBottom: "20px" }}
          >
            Login with Credentials
          </Button>
        </form>

        {/* Divider */}
        <Divider sx={{ margin: "20px 0" }}>or</Divider>

        {/* Login with MetaMask */}
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleMetaMaskLogin}
          startIcon={<WalletRoundedIcon />}
          sx={{ marginBottom: "20px" }}
        >
          Login with MetaMask
        </Button>

        {/* Links for Forgot Password and Sign Up */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/forgot-password" variant="body2">
            Forgot password?
          </Link>
          <Link href="/signup" variant="body2">
            Don't have an account?
          </Link>
        </Box>

        {/* Toast Notifications */}
        <ToastContainer position="top-right" />
      </motion.div>
    </Box>
  );
};

export default LoginPage;
