require("dotenv").config();
const express = require("express");
const server = express();

server.use(express.json());

const port = process.env.PORT || 9000;

// Sample users array
const users = [
  { id: 1, username: "Harry Potter", password: "ringbearer" },
  { id: 2, username: "Hermione Granger", password: "loyalfriend" },
  { id: 3, username: "Ron Weasley", password: "bestfriend" },
  { id: 4, username: "Lord Voldemort", password: "evillord" },
  { id: 5, username: "Dobby", password: "midget" },
];

// POST /api/register route to create a new user
server.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Create a new user
  const newUser = {
    id: users.length + 1, // Incrementing the id for the new user
    username,
    password, // In a real app, the password should be hashed
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// POST /api/login route to check username and password
server.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Check if the user exists and the password matches
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // If valid credentials, respond with a welcome message
    res.json({ message: `Welcome, ${user.username}!` });
  } else {
    // If credentials are invalid, respond with a 401 Unauthorized
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// GET /api/users route to return the list of users
server.get("/api/users", (req, res) => {
  res.json(users);
});

// Fallback route
server.use("*", (req, res) => {
  res.json({ message: "API is UP!" });
});

// Start the server
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});