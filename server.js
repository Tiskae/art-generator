const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

// API Routes
app.post("/api/favorites", async (req, res) => {
  try {
    const fav = new Favorite(req.body);
    await fav.save();
    res.status(201).send("Favorite saved!");
  } catch (err) {
    res.status(500).send("Error saving favorite.");
  }
});

app.get("/api/favorites", async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (err) {
    res.status(500).send("Error fetching favorites.");
  }
});

// Views
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});