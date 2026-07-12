const express = require("express");
const app = express();
const PORT = 3000;
const cors=require("cors");
app.use(cors());
// 1. Import the MySQL translator
const mysql = require("mysql2");

// 2. Set up the connection credentials
const db = mysql.createConnection({
    host: "localhost",
    user: "root",                  // This is the default MySQL username
    password: "lionsql",     // <-- CHANGE THIS to your actual MySQL password!
    database: "todo_app"           // The database you just created
});

// 3. Actually connect and test it
db.connect(function(err) {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("Successfully connected to MySQL database!");
    }
});

// 1. MIDDLEWARE: Tells your server how to read incoming JSON data
app.use(express.json());



// 2. GET ROUTE (Read): Sends all saved lists to the frontend
app.get("/api/lists", function(req, res) {
    res.json(savedLists);
});

// 3. POST ROUTE (Create): Receives a new list and saves it
app.post("/api/lists", function(req, res) {
    const newList = req.body; 
    savedLists.push(newList); 
    
    res.status(201).json({ message: "List saved successfully!", currentLists: savedLists });
});

// 4. Turn the server on
app.listen(PORT, function() {
    console.log(`API Server running on http://localhost:${PORT}`);
});