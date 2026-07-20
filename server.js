const express = require("express");
const app = express();
app.use(express.json());
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






// 2. GET ROUTE (Read): Sends all saved lists to the frontend
app.get("/api/lists", function(req, res) {
    const sqlquery= "select * from lists";
    db.query(sqlquery,function(err,results){
        if(err){
            console.error("Database error",err);
            return res.status(500).json({error:"failed to fetch from database"});

        }
        res.json(results);
    });
});

// 3. POST ROUTE (Create): Receives a new list and saves it
app.post("/api/lists", function(req, res) {
    const newList = req.body; 
    const sqlquerry="insert into lists (title,tasks) VALUES (?,?)";
    db.query(sqlquerry, [newList.title, JSON.stringify(newList.tasks)], function(err, result) {
        if (err) {
            console.error("Database error: ", err);
            // Send a 500 (Internal Server Error) if it fails
            return res.status(500).json({ error: "Failed to save to database" }); 
        }
        
        // 3. Send the success receipt back to the frontend
        res.status(201).json({ message: "List saved permanently to MySQL!" });
    });
});
app.post("/api/signup", function(req, res) {
    // TRACKER 1: Did the request even arrive?
    console.log("--- NEW SIGNUP REQUEST RECEIVED ---");
    
    // TRACKER 2: Open the delivery truck to see what's inside
    console.log("Payload inside the truck:", req.body);

    const newuser = req.body; 

    // DEFENSIVE GUARDRAIL: If the truck is empty, stop the crash safely!
    if (!newuser || !newuser.username || !newuser.password) {
        console.log("CRASH PREVENTED: The server received empty or missing data!");
        return res.status(400).json({ error: "The server did not receive the JSON data correctly. Check your body parser!" });
    }

    const sqlQuery = "INSERT INTO users (username, password) VALUES (?, ?)";

    db.query(sqlQuery, [newuser.username, newuser.password], function(err, result) {
        if (err) {
            // TRACKER 3: Explicit database error log
            console.error("DATABASE ERROR CAUGHT:", err);
            
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: "Username already exists! Choose another." });
            }
            return res.status(500).json({ error: "Failed to save user to database" }); 
        }
        
        // TRACKER 4: Success
        console.log("SUCCESS: New user officially saved to the vault!");
        res.status(201).json({ message: "Account successfully created!" });
    });
});

// 4. Turn the server on
app.listen(PORT, function() {
    console.log(`API Server running on http://localhost:${PORT}`);
});