import React from 'react';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const goals = [
    {
      icon: <ReportProblemIcon sx={{ fontSize: 40, color: '#147ae4' }} />,
      header: 'Report Missing Persons',
      description: 'Our platform allows users to report missing persons quickly and efficiently, ensuring that the information reaches the right authorities and the community.',
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: '#147ae4' }} />,
      header: 'Search and Locate',
      description: 'We provide powerful search tools to help locate missing persons by filtering through various criteria and leveraging community input that will help the society.',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#147ae4' }} />,
      header: 'Community Support',
      description: 'Engage the community in the search efforts, allowing for a collaborative approach to finding missing persons and providing support to affected families.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#147ae4' }} />,
      header: 'Ensure Safety',
      description: 'Our platform prioritizes the safety and security of all users, implementing robust measures to protect sensitive information and ensure a safe environment.',
    },
  ];

  return (
   <Box sx={{display:"flex"}}>
     <Box sx={{ padding: '50px', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        What is TraceSafe ???
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '40px', maxWidth: '800px', margin: 'auto' }}>
        Our mission is to provide a comprehensive platform for reporting and locating missing persons, leveraging community support and advanced search tools to ensure the safety and well-being of all individuals.
      </Typography>
      <Grid container spacing={4} direction={isMobile ? 'column' : 'row'}>
        {goals.map((goal, index) => (
          <Grid item xs={12} md={3} key={index} sx={{ marginTop: '40px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }} // Scale up on hover
            >
              <Box
                sx={{
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: 3,
                  backgroundColor: 'white',
                  textAlign: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s', // Smooth transition for hover effect
                  '&:hover': {
                    boxShadow: 6, // Increase shadow on hover
                    transform: 'translateY(-5px)', // Slightly raise the card on hover
                  },
                }}
              >
                {goal.icon}
                <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold' }}>
                  {goal.header}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '10px' }}>
                  {goal.description}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
   </Box>
  );
};

export default AboutUs;
