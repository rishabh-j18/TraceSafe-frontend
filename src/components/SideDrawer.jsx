import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const SideDrawer = ({ drawerOpen, setDrawerOpen, menuItems }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      sx={{
        width: drawerOpen ? 240 : 60,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerOpen ? 240 : 60,
          boxSizing: "border-box",
          overflowX: "hidden",
          backgroundColor: "white",
          color: "#147ae4",
          cursor: "pointer",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(1),
          paddingTop: 2,
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(!drawerOpen)}
          sx={{ color: "#147ae4", paddingRight: "30px", fontWeight: "bold" }}
        >
          <Menu />
        </IconButton>
        {drawerOpen && (
          <Typography variant="h6" noWrap>
            TraceSafe
          </Typography>
        )}
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon sx={{ color: "#147ae4" }}>{item.icon}</ListItemIcon>
            {drawerOpen && (
              <ListItemText primary={item.label} sx={{ fontWeight: "bold" }} />
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
