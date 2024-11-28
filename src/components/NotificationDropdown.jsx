// NotificationDropdown.js
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../AuthContext';

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openChat, setOpenChat] = useState(false);
    const [activeNotification, setActiveNotification] = useState(null);
    const [reply, setReply] = useState('');
    const {isLoggedIn}=useAuth();
    
    useEffect(() => {
        let socket;

    if (isLoggedIn) {
      // WebSocket logic to listen to backend notifications
      socket = new WebSocket('ws://localhost:5000'); // Use your WebSocket server URL

      socket.onmessage = (event) => {
        const newNotification = JSON.parse(event.data);
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      };
    }

    return () => {
      if (socket) socket.close();
    };
  }, [isLoggedIn]);

  const handleNotificationClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openChatDialog = (notification) => {
    setActiveNotification(notification);
    setOpenChat(true);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const sendReply = () => {
    // Logic to send reply to the backend (WebSocket or API endpoint)
    // For now, we'll just log the reply
    console.log('Reply:', reply);
    setReply('');
  };

  const closeChatDialog = () => {
    setOpenChat(false);
    setActiveNotification(null);
  };

  return (
    <>
      {isLoggedIn && (
        <IconButton color="inherit" onClick={handleNotificationClick}>
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <List sx={{ width: 300 }}>
          {notifications.length ? (
            notifications.map((notification, index) => (
              <ListItem
                button
                key={index}
                onClick={() => openChatDialog(notification)}
              >
                <ListItemText
                  primary={notification.title}
                  secondary={notification.message}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No new notifications" />
            </ListItem>
          )}
        </List>
      </Popover>

      {/* Chat Dialog for interacting with a notification */}
      <Dialog open={openChat} onClose={closeChatDialog} fullWidth maxWidth="sm">
        <DialogContent>
          <h3>{activeNotification?.title}</h3>
          <p>{activeNotification?.message}</p>
          <TextField
            label="Type your reply"
            fullWidth
            value={reply}
            onChange={handleReplyChange}
            multiline
            rows={3}
          />
          <Button onClick={sendReply} variant="contained" sx={{ mt: 2 }}>
            Send Reply
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationDropdown;
