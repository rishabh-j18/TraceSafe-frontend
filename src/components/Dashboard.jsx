import React, { useState, useEffect} from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
//   useMediaQuery,
} from '@mui/material';
import { Home, Report, Search, Flag } from '@mui/icons-material';
// import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import SideDrawer from './SideDrawer';

const Dashboard = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Menu items for the Drawer
  const menuItems = [
    { label: 'Home', icon: <Home />, path: '/' },
    { label: 'Missing Person Report', icon: <Report />, path: '/report' },
    { label: 'Search Person', icon: <Search />, path: '/search' },
    { label: 'Flag Person', icon: <Flag />, path: '/flag' },
  ];

  // D3 Graph rendering
  useEffect(() => {
    const svg = d3.select("#graph")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");

    // Example data
    const data = [
      { category: 'Age 0-10', value: 30 },
      { category: 'Age 11-20', value: 50 },
      { category: 'Age 21-30', value: 40 },
      { category: 'Age 31-40', value: 20 },
      { category: 'Age 41-50', value: 10 },
    ];

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = parseInt(svg.style("width")) - margin.left - margin.right;
    const height = parseInt(svg.style("height")) - margin.top - margin.bottom;

    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    // Render bars
    svg.append("g")
      .attr("fill", "#147ae4")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.category))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

    // Render axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Clean up the effect by removing the SVG
    return () => {
      svg.remove();
    };
  }, []);

 
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Section: Drawer */}
      <SideDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} menuItems={menuItems} />

      {/* Right Section: Dashboard Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        

        {/* Cards Section */}
        <Grid container spacing={3} sx={{ marginTop: '20px' }}>
          {[
            { title: 'Total Missing People in a year', count: 123, icon: <Home sx={{ fontSize: 50, color: '#fff' }} />, bgColor: '#ff6f61' },
            { title: 'Total People Found Last Month', count: 45, icon: <Search sx={{ fontSize: 50, color: '#fff' }} />, bgColor: '#6b5b95' },
            { title: 'Total Persons Filed as Missing Last Month', count: 30, icon: <Report sx={{ fontSize: 50, color: '#fff' }} />, bgColor: '#88b04b' },
          ].map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ display: 'flex', backgroundColor: card.bgColor, color: '#fff', height: '150px' }}>
                <Box sx={{ flex: 10, p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{card.title}</Typography>
                  <Typography variant="h6">{card.count}</Typography>
                </Box>
                <Box sx={{ flex: 12, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {card.icon}
                  </motion.div>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Graph Section */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h5" gutterBottom>
            Missing Persons Statistics
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Button variant="contained" color="primary">By Age</Button>
            <Button variant="contained" color="primary">By State</Button>
          </Box>
          <Box id="graph" sx={{ height: '400px', backgroundColor: '#f5f5f5' }}>
            {/* D3 Graph will be rendered here */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
