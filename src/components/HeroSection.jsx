import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const photos = [
    'https://media.istockphoto.com/id/1300730526/vector/missing-poster-doodle.jpg?s=612x612&w=0&k=20&c=RShjoMerodavlJ16DowLvXcfJJ3kkql96_9_l3xnwx0=', // Replace with actual URLs of missing persons' photos
    'https://images.squarespace-cdn.com/content/v1/5b8709309f87706a308b674a/1630432472107-419TL4L1S480Z0LIVRYA/Missing.jpg',
    'https://le-cdn.hibuwebsites.com/f511e87f7167472dad794fd50a9d00d9/dms3rep/multi/opt/blog25-640w.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLXDIAPj3plkvvdQPGcmbTcQ7k_9rD6l96RQ&s',
    'https://img.freepik.com/premium-vector/missing-person-announcement-flyer-hanging-brick-wall_124715-1968.jpg?semt=ais_hybrid'
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh' }}>
      {/* Left Section */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', position: 'relative' }}>
        <motion.div
            animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{ fontSize: '10rem', color: '#000', position: 'absolute', zIndex: 1 }}
        >
          ?
        </motion.div>
        {photos.map((photo, index) => (
          <motion.img
            key={index}
            src={photo}
            alt={`Missing person ${index + 1}`}
            style={{ width: '100px', height: '100px', borderRadius: '50%', position: 'absolute', top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%`, zIndex: 2 }}
            animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            style={{ fontSize: '2rem', color: '#000', position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, zIndex: 0 }}
          >
            ?
          </motion.div>
        ))}
      </Box>

      {/* Right Section */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" sx={{ color: 'red', fontWeight: 'bold' }}>
            TraceSafe
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h5" sx={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px', animation: 'typing 2s steps(22), blink 0.5s step-end infinite alternate', whiteSpace: 'nowrap', overflow: 'hidden', borderRight: '0.15em solid orange' }}>
            Your safety, our priority
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeroSection;
