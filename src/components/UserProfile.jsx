import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
  Alert,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { toast, ToastContainer } from "react-toastify";
import { updateUserProfile } from "../services/apiCalls";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoURL, setCoverPhotoURL] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    aadhar: "",
    occupation: "",
    address: "",
    credits: 0,
  });

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const storedData = localStorage.getItem("userData");
        const parsedData = JSON.parse(storedData);
        setUserData({
          name: parsedData.name || "",
          username: parsedData.username || "",
          email: parsedData.email || "",
          phone: parsedData.mobile || "",
          aadhar: parsedData.aadhar || "",
          occupation: parsedData.occupation || "",
          address: parsedData.address || "",
          credits: parsedData.credits || 0,
        });
        setCoverPhotoURL(parsedData.coverPhoto || "");
        setProfilePhotoURL(parsedData.profilePhoto || "");
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo updates
  const handlePhotoChange = (type, file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "cover") {
        setCoverPhoto(file);
        setCoverPhotoURL(url);
      } else if (type === "profile") {
        setProfilePhoto(file);
        setProfilePhotoURL(url);
      }
    }
  };

  // Save profile changes
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => formData.append(key, value));
      if (coverPhoto) formData.append("coverPhoto", coverPhoto);
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);

      const response = await updateUserProfile(formData);
      if (response.status === 200) {
        const updatedData = response.data.updatedUser;
        localStorage.setItem("userData", JSON.stringify(updatedData));
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <ToastContainer />
      <Card sx={{ width: "80%", maxWidth: "800px" }}>
        <CardContent>
          {/* Cover Photo */}
          <Box sx={{ position: "relative", height: "200px", bgcolor: "#147ae4", borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
            {coverPhotoURL && <img src={coverPhotoURL} alt="Cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="cover-photo-upload"
              type="file"
              onChange={(e) => handlePhotoChange("cover", e.target.files[0])}
            />
            <label htmlFor="cover-photo-upload">
              <IconButton component="span" sx={{ position: "absolute", top: 10, right: 10, color: "#fff" }}>
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </Box>

          {/* Profile Photo and Rewards */}
          <Box sx={{ position: "relative", textAlign: "center", mt: -6 }}>
            <Avatar src={profilePhotoURL} sx={{ width: 100, height: 100, border: "3px solid #fff", zIndex: 1 }} />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="profile-photo-upload"
              type="file"
              onChange={(e) => handlePhotoChange("profile", e.target.files[0])}
            />
            <label htmlFor="profile-photo-upload">
              <IconButton component="span" sx={{ position: "absolute", bottom: 0, right: -20, color: "#147ae4", bgcolor: "#fff" }}>
                <EditIcon />
              </IconButton>
            </label>
            <Tooltip title={`Rewards: ${userData.credits}`} arrow>
              <IconButton
                sx={{
                  position: "absolute",
                  top: -10,
                  right: 10,
                  color: "#f4c10f",
                  bgcolor: "#fff",
                  zIndex: 2,
                }}
              >
                <EmojiEventsIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* User Form */}
          <Box sx={{ mt: 6 }}>
            <form onSubmit={handleSave}>
              <Grid container spacing={2}>
                {["name", "username", "email", "phone"].map((field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={userData[field]}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                    />
                  </Grid>
                ))}
                {["aadhar", "occupation", "address"].map((field) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={userData[field]}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" disabled={saving}>
                    {saving ? <CircularProgress size={24} /> : "Save"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
