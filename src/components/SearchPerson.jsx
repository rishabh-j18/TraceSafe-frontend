import React, { useState } from "react";
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
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const SearchPerson = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const data = [
      {
        name: "John Doe",
        aadhar: "XXXXXXXX9178",
        reportedOn: "2024-10-01",
        reportStatus: "Reported",
        photo: "path/to/photo.jpg",
        reward: "20",
      },
      {
        name: "Jane Smith",
        aadhar: "XXXXXXXX1234",
        reportedOn: "2024-09-15",
        reportStatus: "Ongoing",
        photo: "path/to/photo2.jpg",
        reward: "20",
      },
    ];

    const filteredResults = data.filter(
      (person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.aadhar.includes(searchQuery)
    );

    setResults(filteredResults);
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
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      <Grid
        sx={{ padding: 4 }}
        container
        spacing={4}
        justifyContent="center" // Centers the cards horizontally
        alignItems="center" // Optional: Centers them vertically if needed
      >
        {results.map((person, index) => (
          <Grid item xs={14} sm={12} md={8} key={index}>
            <Card>
              <Grid container>
                <Grid item xs={7}>
                  <CardContent sx={{ padding: 4 }}>
                    <Typography variant="h6">{person.name}</Typography>
                    <Typography variant="body2">
                      Aadhaar: {person.aadhar}
                    </Typography>
                    <Typography variant="body2">
                      Reported On: {person.reportedOn}
                    </Typography>
                    <Typography variant="body2">
                      Report Status: {person.reportStatus}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "red" }}
                    >
                      Reward: {person.reward}
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
                  <img
                    src={person.photo}
                    alt={person.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" p={3}>
                <Button
                  endIcon={<PlaylistAddIcon />}
                  onClick={() => (window.location.href = `/person/${index}`)}
                >
                  More Details
                </Button>
                <Button
                sx={{backgroundColor:"#147ae4",color:"white",margin:'10px'}}
                >
                  Flag Location
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchPerson;
