import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/Report';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../AuthContext'; // Import useAuth

const AppBarComponent = () => {
  const { isLoggedIn, logout } = useAuth(); // Access user status and logout function
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Media query to check for mobile screen sizes
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer state for mobile screens

  // Handle drawer open/close for mobile
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Handle logout
  const handleLogout = () => {
    logout(); // Perform logout
    navigate('/login'); // Redirect to login page after logout
  };

  // Menu items for logged-in users
  const loggedInMenuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'My Profile', path: '/profile', icon: <AccountCircleIcon /> },
    { label: 'Report', path: '/report', icon: <ReportIcon /> },
    { label: 'Search', path: '/search', icon: <PersonSearchIcon /> },
    { label: 'Logout', action: handleLogout, icon: <LogoutIcon /> },
  ];

  // Menu items for logged-out users
  const loggedOutMenuItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'About Us', path: '/about', icon: <InfoIcon /> },
    { label: 'Contact Us', path: '/contact', icon: <ContactMailIcon /> },
    { label: 'Login', path: '/login', icon: <LoginIcon /> },
  ];

  // Handle navigation on button click
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Determine the menu items based on login status
  const menuItems = isLoggedIn ? loggedInMenuItems : loggedOutMenuItems;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#147ae4', paddingLeft: 5, paddingRight: 5 }}>
      <Toolbar>
        {/* App Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold', color: 'white' }}
          onClick={() => handleNavigation('/')}
        >
          TraceSafe
        </Typography>

        {/* For mobile screens, show a menu icon and drawer */}
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Drawer for mobile view */}
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <List>
                {menuItems.map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => {
                      if (item.action) {
                        item.action(); // If it's an action like logout
                      } else {
                        handleNavigation(item.path); // Navigate to the route
                      }
                      setDrawerOpen(false); // Close drawer after navigation
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          /* For larger screens, show menu items as buttons */
          menuItems.map((item, index) => (
            <motion.div whileHover={{ scale: 1.1 }} key={index}>
              <Button
                color="inherit"
                onClick={() => {
                  if (item.action) {
                    item.action(); // Handle actions like logout
                  } else {
                    handleNavigation(item.path);
                  }
                }}
              >
                {item.label}
              </Button>
            </motion.div>
          ))
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
