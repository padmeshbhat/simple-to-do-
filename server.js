const express = require("express");
const app = express();
const PORT = 3000;
const cors=require("cors");
app.use(cors());

// 1. MIDDLEWARE: Tells your server how to read incoming JSON data
app.use(express.json());

// 2. IN-MEMORY DATABASE: A temporary array to hold your tasks
let savedLists = [];

// 3. GET ROUTE (Read): Sends all saved lists to the frontend
app.get("/api/lists", function(req, res) {
    res.json(savedLists);
});

// 4. POST ROUTE (Create): Receives a new list and saves it
app.post("/api/lists", function(req, res) {
    const newList = req.body; 
    savedLists.push(newList); 
    
    res.status(201).json({ message: "List saved successfully!", currentLists: savedLists });
});

// 5. Turn the server on
app.listen(PORT, function() {
    console.log(`API Server running on http://localhost:${PORT}`);
});