import React from 'react';
import { Box, Card, CardContent, TextField, Typography, Grid, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card sx={{ width: '80%', display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: '20px' }}>
        {/* Left Section */}
        <Box sx={{ flex: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: isMobile ? '20px' : '0' }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -30, 30, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PhoneIcon sx={{ fontSize: 100, color: '#147ae4' }} />
          </motion.div>
        </Box>

        {/* Right Section */}
        <Box sx={{ flex: 8 }}>
          <CardContent>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
              Contact Us
            </Typography>
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Name" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Typography variant="body2" sx={{ marginTop: '20px', color: 'gray', textAlign: 'center' }}>
                We will contact you soon.
              </Typography>
            </form>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default ContactUs;
