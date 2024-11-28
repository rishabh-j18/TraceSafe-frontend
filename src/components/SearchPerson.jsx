import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { getMissingPerson } from "../services/apiCalls";
import { useNavigate } from "react-router-dom";

const SearchPerson = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]); // To store filtered results
  const [allPersons, setAllPersons] = useState([]); // To store all persons data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate= useNavigate();

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

  // Function to handle search
  const handleSearch = () => {
    const filteredResults = allPersons.filter(
      (person) =>
        person.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.aadhar.includes(searchQuery)
    );

    setResults(filteredResults); // Update results based on the search query
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Search for a Person
      </Typography>
      <Box display="flex" justifyContent="center" mb={4}>
        <TextField
          label="Search by Name or Aadhaar"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mr: 2, width: "40%" }}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </Box>

      {error && <Typography color="red" align="center">{error}</Typography>}

      <Grid container spacing={4} justifyContent="center" alignItems="center">
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
      </Grid>
    </Container>
  );
};

export default SearchPerson;
