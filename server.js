const express=require("express");
const app=express();
const axios=require("axios");
const path=require("path");
const port=3000;
const apiKey="b211bb46";

//app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route to handle search requests
app.get("/search", async (req, res) => {
  const query = req.query.query;
  try {
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: apiKey,
        s: query,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data from OMDB API");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});