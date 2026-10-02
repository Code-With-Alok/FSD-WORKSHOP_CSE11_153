import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;

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

app.get("/", (req, res) => {
  res.send("Login Server is running");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const users = readUsers();

  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

app.listen(PORT, () => {
  console.log(
    `Login server running at http://localhost:${PORT}`
  );
});