import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE = path.join(__dirname, "userData.json");

// Create the file if it does not exist
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
}

function readUsers() {
    const data = fs.readFileSync(FILE, "utf8");

    if (!data.trim()) {
        return [];
    }

    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(
        FILE,
        JSON.stringify(users, null, 2)
    );
}

// CREATE USER
app.post("/users", (req, res) => {
    const users = readUsers();

    const user = {
        id:
            users.length > 0
                ? Math.max(...users.map((user) => user.id)) + 1
                : 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(user);
    writeUsers(users);

    res.status(201).json({
        message: "User created successfully",
        user
    });
});

// READ USERS
app.get("/users", (req, res) => {
    const users = readUsers();
    res.status(200).json(users);
});

// UPDATE USER
app.put("/users/:id", (req, res) => {
    const users = readUsers();
    const id = Number(req.params.id);

    const user = users.find(
        (user) => user.id === id
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (req.body.name) {
        user.name = req.body.name;
    }

    if (req.body.email) {
        user.email = req.body.email;
    }

    writeUsers(users);

    res.status(200).json({
        message: "User updated successfully",
        user
    });
});

// DELETE USER
app.delete("/users/:id", (req, res) => {
    const users = readUsers();
    const id = Number(req.params.id);

    const updatedUsers = users.filter(
        (user) => user.id !== id
    );

    if (users.length === updatedUsers.length) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    writeUsers(updatedUsers);

    res.status(200).json({
        message: "User deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(
        `Assignment server running at http://localhost:${PORT}`
    );
});