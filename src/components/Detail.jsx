import React, { useEffect, useState } from "react";
// Import React and other hooks

// Import Material-UI components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

// If you're using react-router-dom
import { useNavigate } from 'react-router-dom'; // For navigation
import { getMissingPerson } from "../services/apiCalls";



const Detail = () => {

    const navigate = useNavigate();
    const [results, setResults] = useState([]); // To store filtered results
    const [allPersons, setAllPersons] = useState([]); // To store all persons data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  

 // Fetching the data from the backend using getMissingPerson() when the component mounts
 useEffect(() => {
    const fetchMissingPersons = async () => {
      setLoading(true);
      setError(""); // Reset error state
    
      try {
        const data = await getMissingPerson();
        console.log('Data fetched:', data); // Log the fetched data

        setAllPersons(data.data); // Store all persons data for filtering
        setResults(data.data);
        // Check if data is an array and update states
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch missing persons data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMissingPersons();
  }, []);


  return
  <>

{results.length > 0 ? (
          results.map((person) => (
            <Grid item xs={14} sm={12} md={8} key={person._id}> {/* Using person._id as key */}
              <Card>
                <Grid container>
                  <Grid item xs={7}>
                    <CardContent sx={{ padding: 4 }}>
                      <Typography variant="h6">{person.fullName}</Typography>
                      <Typography variant="body2">
                        Aadhaar: {person.aadhar} {/* Ensure Aadhaar is displayed correctly */}
                      </Typography>
                      <Typography variant="body2">
                        Reported On: {new Date(person.createdAt).toLocaleDateString()} {/* Format date */}
                      </Typography>
                      <Typography variant="body2">
                        Last Seen Date: {new Date(person.lastSeenDate).toLocaleDateString()} {/* Format last seen date */}
                      <Typography variant="body1" sx={{ fontWeight: "bold", color: "red" }}>
                        Reward: ₹{parseFloat(person.reward).toFixed(2)} {/* Parse reward as a float */}
                      </Typography>
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* Assuming 'photo' is a valid property in your data */}
                    {person.photo ? (
                      <img
                        src={person.photo}
                        alt={person.fullName}
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : (
                      <Typography>No Image Available</Typography>
                    )}
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="flex-end" p={3}>
                  <Button
                    endIcon={<PlaylistAddIcon />}
                    onClick={() => (window.location.href = `/person/${person._id}`)} // Use person._id for the URL
                  >
                    More Details
                  </Button>
                  <Button 
                    onClick={()=>navigate('/flag')}
                    sx={{ backgroundColor: "#147ae4", color: "white", margin: '10px' }}
                  >
                    Flag Location
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography align="center" variant="body1">
            {loading ? "Loading..." : "No results found."}
          </Typography>
        )}

  </>
};

export default Detail;
