import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, TextField, Button, Typography, Box, Grid 
} from '@mui/material';
import { motion } from 'framer-motion';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import { flagMissing } from '../services/apiCalls';
import { toast, ToastContainer } from 'react-toastify';

const FlagLocation = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 26.81277, lng:80.909  }); // Default: San Francisco
  const [formData, setFormData] = useState({
    location: '',
    coordinates: { lat: '', lng: '' }, // Store coordinates as JSON
    dateTime: '',
    photos: [],
    video: null,
    description: '',
    reporterName: '',
    contactInfo: '',
    witnessName: '',
    witnessContact: '',
    additionalNotes: '',
  });

  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'location') {
      setLocation(value);
      if (value.trim()) {
        await fetchCoordinates(value);
      }
    }
  };

  const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address,
            key: process.env.GOOGLE_MAPS_API_KEY,
          },
        }
      );

      const results = response.data.results;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setCoordinates({ lat, lng }); // Update local state
        setFormData((prevData) => ({
          ...prevData,
          coordinates: { lat, lng }, // Store coordinates in formData
        }));
      } else {
        alert('Location not found. Please enter a valid address.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      alert('An error occurred while fetching the coordinates.');
    }
  };

  const handleMapClick = ({ lat, lng }) => {
    setCoordinates({ lat, lng });
    setFormData((prevData) => ({
      ...prevData,
      coordinates: { lat, lng }, // Store clicked coordinates in formData
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await flagMissing(formData);
      console.log(formData);
      console.log(response);

      if (response.status === 200) {
        toast.success('Submitted successfully');
        setTimeout(() => navigate('/dashboard'), 6000);
      } else {
        toast.error(response.message || 'Error occurred, try again');
      }
    } catch (error) {
      toast.error('Submission failed, please try again');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <ToastContainer />
      <Typography variant="h4" align="center" gutterBottom>
        Flag Found Person
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Please provide the details below to flag the location of the found person.
      </Typography>
      <form onSubmit={handleSubmit}>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          style={{ padding: '20px' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location (Address or Coordinates)"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                margin="normal"
              />
              <Box height="300px" mb={2}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                  center={coordinates}
                  defaultZoom={11}
                  onClick={handleMapClick}
                />
              </Box>
              <TextField
                fullWidth
                type="datetime-local"
                label="Date and Time"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleInputChange}
                required
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <Button variant="contained" component="label" sx={{ mt: 2 }}>
                Upload Photos
                <input type="file" hidden multiple onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setFormData({ ...formData, photos: files.map(file => URL.createObjectURL(file)) });
                }} />
              </Button>
              {formData.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Proof ${index + 1}`}
                  style={{ marginTop: '20px', width: '100%' }}
                />
              ))}
              <Button variant="contained" component="label" sx={{ mt: 2 }}>
                Upload Video
                <input type="file" hidden onChange={(e) => {
                  setFormData({ ...formData, video: URL.createObjectURL(e.target.files[0]) });
                }} />
              </Button>
              {formData.video && (
                <video
                  src={formData.video}
                  controls
                  style={{ marginTop: '20px', width: '100%' }}
                />
              )}
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Reporter’s Name"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleInputChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Contact Information"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleInputChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Witness Name"
                name="witnessName"
                value={formData.witnessName}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Witness Contact"
                name="witnessContact"
                value={formData.witnessContact}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Additional Notes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </motion.div>
      </form>
      <Box mt={4} textAlign="center">
        <Typography variant="h6">Reward: 100 Coins</Typography>
      </Box>
    </Container>
  );
};

export default FlagLocation;
