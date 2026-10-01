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

const dataFile = path.join(__dirname, "userData.json");

app.use(cors());
app.use(express.json());

function readUsers() {
    const data = fs.readFileSync(dataFile, "utf8");

    if (!data.trim()) {
        return [];
    }

    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(
        dataFile,
        JSON.stringify(users, null, 2)
    );
}

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Lab6 Express Server");
});

// GET all users
app.get("/users", (req, res) => {
    const users = readUsers();
    res.status(200).json(users);
});

// GET user by ID
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const users = readUsers();

    const user = users.find(
        (user) => user.id === id
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);
});

// POST new user
app.post("/users", (req, res) => {
    const users = readUsers();

    const newUser = {
        id:
            users.length > 0
                ? Math.max(...users.map((user) => user.id)) + 1
                : 1,

        name: req.body.name,
        age: req.body.age
    };

    users.push(newUser);

    writeUsers(users);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

// PUT update user
app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const users = readUsers();

    const index = users.findIndex(
        (user) => user.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users[index] = {
        ...users[index],
        ...req.body,
        id
    };

    writeUsers(users);

    res.status(200).json({
        message: "User updated successfully",
        user: users[index]
    });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const users = readUsers();

    const userExists = users.some(
        (user) => user.id === id
    );

    if (!userExists) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const updatedUsers = users.filter(
        (user) => user.id !== id
    );

    writeUsers(updatedUsers);

    res.status(200).json({
        message: "User deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(
        `Express server is running at http://localhost:${PORT}`
    );
});