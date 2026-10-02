import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE = path.join(__dirname, "userData.json");

// React frontend ko allow karega
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// File check
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "[]");
}

// Read users
function readUsers() {
  const data = fs.readFileSync(FILE, "utf8");

  if (!data.trim()) {
    return [];
  }

  return JSON.parse(data);
}

// Save users
function saveUsers(users) {
  fs.writeFileSync(
    FILE,
    JSON.stringify(users, null, 2)
  );
}

// Generate next ID
function getNextId(users) {
  if (users.length === 0) {
    return 1;
  }

  return Math.max(...users.map((user) => user.id)) + 1;
}

// Home
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Lab6 Express Server",
  });
});

// Message route
app.get("/msg", (req, res) => {
  res.status(200).json({
    message: "Welcome to Express Server",
  });
});

/*
==================================================
OLD ROUTES
These keep our existing API Tester working
==================================================
*/

// GET all users
app.get("/users", (req, res) => {
  const users = readUsers();

  res.status(200).json(users);
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const users = readUsers();

  const id = parseInt(req.params.id);

  const user = users.find(
    (user) => user.id === id
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
});

// CREATE user
app.post("/users", (req, res) => {
  const users = readUsers();

  const newUser = {
    id: getNextId(users),
    ...req.body,
  };

  users.push(newUser);

  saveUsers(users);

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const users = readUsers();

  const id = parseInt(req.params.id);

  const user = users.find(
    (user) => user.id === id
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  Object.assign(user, req.body);

  saveUsers(users);

  res.status(200).json({
    message: "User updated successfully",
    user,
  });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const users = readUsers();

  const id = parseInt(req.params.id);

  const filteredUsers = users.filter(
    (user) => user.id !== id
  );

  if (filteredUsers.length === users.length) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  saveUsers(filteredUsers);

  res.status(200).json({
    message: "User deleted successfully",
  });
});

/*
==================================================
NEW CLASSWORK ROUTES
Used by React + Axios
==================================================
*/

// GET users using new route
app.get("/user", (req, res) => {
  const users = readUsers();

  res.status(200).json({
    msg: "User info retrieved",
    data: users,
  });
});

// GET one user
app.get("/user/:id", (req, res) => {
  const users = readUsers();

  const id = parseInt(req.params.id);

  const user = users.find(
    (user) => user.id === id
  );

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  res.status(200).json({
    msg: "User retrieved successfully",
    data: user,
  });
});

// SIGNUP / CREATE
app.post("/create", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required",
    });
  }

  const users = readUsers();

  const newUser = {
    id: getNextId(users),
    name,
    email,
  };

  users.push(newUser);

  saveUsers(users);

  res.status(201).json({
    msg: "User created successfully",
    data: newUser,
  });
});

// UPDATE using new route
app.put("/user/:id", (req, res) => {
  const users = readUsers();

  const id = parseInt(req.params.id);

  const user = users.find(
    (user) => user.id === id
  );

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  if (req.body.name) {
    user.name = req.body.name;
  }

  if (req.body.email) {
    user.email = req.body.email;
  }

  saveUsers(users);

  res.status(200).json({
    msg: "User updated successfully",
    data: user,
  });
});

// DELETE using new route
app.delete("/user/:id", (req, res) => {
  const users = readUsers();

  const id = parseInt(req.params.id);

  const filteredUsers = users.filter(
    (user) => user.id !== id
  );

  if (filteredUsers.length === users.length) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  saveUsers(filteredUsers);

  res.status(200).json({
    msg: `User ${id} deleted successfully`,
  });
});

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});