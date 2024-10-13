import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

const steps = [
  "Personal Information",
  "Physical Description",
  "Last Seen Information",
  "Contact Information",
  "Additional Information",
];

const MissingPersonReport = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    nickname: "",
    dateOfBirth: "",
    gender: "",
    photo: null,
    height: "",
    weight: "",
    eyeColor: "",
    hairColor: "",
    distinguishingFeatures: "",
    lastSeenDate: "",
    lastSeenLocation: "",
    clothingDescription: "",
    circumstances: "",
    reporterName: "",
    relationship: "",
    phoneNumber: "",
    email: "",
    reward: "",
    medicalConditions: "",
    languagesSpoken: "",
    otherInfo: "",
  });

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file), // Generate a preview URL
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      nickname: "",
      dateOfBirth: "",
      gender: "",
      photo: null,
      height: "",
      weight: "",
      eyeColor: "",
      hairColor: "",
      distinguishingFeatures: "",
      lastSeenDate: "",
      lastSeenLocation: "",
      clothingDescription: "",
      circumstances: "",
      reporterName: "",
      relationship: "",
      phoneNumber: "",
      email: "",
      reward: "",
      medicalConditions: "",
      languagesSpoken: "",
      otherInfo: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
    console.log(formData);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Report a Missing Person
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Please fill out the form below to report a missing person.
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt:5 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: "20px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Nickname/Alias"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                  Upload Photo
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {formData.photoPreview && (
                  <img
                    src={formData.photoPreview}
                    alt="Missing Person Preview"
                    style={{ marginTop: "20px", width: "100%" }}
                  />
                )}
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button variant="outlined" onClick={handleReset} sx={{ mr: 2 }}>
                Reset
              </Button>
              <Button variant="contained" onClick={() => handleStepChange(1)}>
                Next
              </Button>
            </Box>
          </motion.div>
        )}
        {activeStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: "20px" }}
          >
            <TextField
              fullWidth
              label="Height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Eye Color"
              name="eyeColor"
              value={formData.eyeColor}
              onChange={handleInputChange}
              required
              margin="normal"
            >
              <MenuItem value="brown">Brown</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="hazel">Hazel</MenuItem>
              <MenuItem value="gray">Gray</MenuItem>
            </TextField>
            <TextField
              fullWidth
              select
              label="Hair Color"
              name="hairColor"
              value={formData.hairColor}
              onChange={handleInputChange}
              required
              margin="normal"
            >
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="brown">Brown</MenuItem>
              <MenuItem value="blonde">Blonde</MenuItem>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="gray">Gray</MenuItem>
              <MenuItem value="white">White</MenuItem>
            </TextField>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Distinguishing Features"
              name="distinguishingFeatures"
              value={formData.distinguishingFeatures}
              onChange={handleInputChange}
              margin="normal"
            />
            <Box mt={2}>
  {activeStep > 0 && (
    <Button
      variant="outlined"
      onClick={() => handleStepChange(activeStep - 1)}
      sx={{ mr: 2 }}
    >
      Previous
    </Button>
  )}
  <Button
    variant="outlined"
    onClick={handleReset}
    sx={{ mr: 2 }}
  >
    Reset
  </Button>
  {activeStep < steps.length - 1 ? (
    <Button
      variant="contained"
      onClick={() => handleStepChange(activeStep + 1)}
    >
      Next
    </Button>
  ) : (
    <Button
      variant="contained"
      type="submit"
    >
      Submit
    </Button>
  )}
</Box>

          </motion.div>
        )}
        {activeStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: "20px" }}
          >
            <TextField
              fullWidth
              type="date"
              label="Last Seen Date"
              name="lastSeenDate"
              value={formData.lastSeenDate}
              onChange={handleInputChange}
              required
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Seen Location"
              name="lastSeenLocation"
              value={formData.lastSeenLocation}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Clothing Description"
              name="clothingDescription"
              value={formData.clothingDescription}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Circumstances"
              name="circumstances"
              value={formData.circumstances}
              onChange={handleInputChange}
              margin="normal"
            />
          <Box mt={2}>
  {activeStep > 0 && (
    <Button
      variant="outlined"
      onClick={() => handleStepChange(activeStep - 1)}
      sx={{ mr: 2 }}
    >
      Previous
    </Button>
  )}
  <Button
    variant="outlined"
    onClick={handleReset}
    sx={{ mr: 2 }}
  >
    Reset
  </Button>
  {activeStep < steps.length - 1 ? (
    <Button
      variant="contained"
      onClick={() => handleStepChange(activeStep + 1)}
    >
      Next
    </Button>
  ) : (
    <Button
      variant="contained"
      type="submit"
    >
      Submit
    </Button>
  )}
</Box>

          </motion.div>
        )}
        {activeStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: "20px" }}
          >
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
              select
              label="Relationship to Missing Person"
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              required
              margin="normal"
            >
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="sibling">Sibling</MenuItem>
              <MenuItem value="friend">Friend</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <Box mt={2}>
  {activeStep > 0 && (
    <Button
      variant="outlined"
      onClick={() => handleStepChange(activeStep - 1)}
      sx={{ mr: 2 }}
    >
      Previous
    </Button>
  )}
  <Button
    variant="outlined"
    onClick={handleReset}
    sx={{ mr: 2 }}
  >
    Reset
  </Button>
  {activeStep < steps.length - 1 ? (
    <Button
      variant="contained"
      onClick={() => handleStepChange(activeStep + 1)}
    >
      Next
    </Button>
  ) : (
    <Button
      variant="contained"
      type="submit"
    >
      Submit
    </Button>
  )}
</Box>

          </motion.div>
        )}
        {activeStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: "20px" }}
          >

            <TextField
              fullWidth
              multiline
              label="Reward"
              name="reward"
              value={formData.reward}
              onChange={handleInputChange}
              margin="normal"
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Medical Conditions"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Languages Spoken"
              name="languagesSpoken"
              value={formData.languagesSpoken}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Other Information"
              name="otherInfo"
              value={formData.otherInfo}
              onChange={handleInputChange}
              margin="normal"
            />
            <Box mt={2}>
  {activeStep > 0 && (
    <Button
      variant="outlined"
      onClick={() => handleStepChange(activeStep - 1)}
      sx={{ mr: 2 }}
    >
      Previous
    </Button>
  )}
  <Button
    variant="outlined"
    onClick={handleReset}
    sx={{ mr: 2 }}
  >
    Reset
  </Button>
  {activeStep < steps.length - 1 ? (
    <Button
      variant="contained"
      onClick={() => handleStepChange(activeStep + 1)}
    >
      Next
    </Button>
  ) : (
    <Button
      variant="contained"
      type="submit"
    >
      Submit
    </Button>
  )}
</Box>

          </motion.div>
        )}
      </form>
    </Container>
  );
};

export default MissingPersonReport;
