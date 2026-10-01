const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const dataFile = path.join(__dirname, "userData.json");

function readUsers() {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
}

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    // LAB 3 - Basic HTTP Server
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        return res.end("Hello World");
    }

    // GET ALL USERS
    if (req.url === "/users" && req.method === "GET") {

        const users = readUsers();

        return sendJSON(res, 200, users);
    }

    // GET USER BY ID
    if (req.method === "GET" && req.url.startsWith("/users/")) {

        const id = Number(req.url.split("/")[2]);

        const users = readUsers();

        const user = users.find(
            user => user.id === id
        );

        if (!user) {
            return sendJSON(res, 404, {
                message: "User not found"
            });
        }

        return sendJSON(res, 200, user);
    }

    // POST USER
    if (req.url === "/users" && req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            try {

                const newUserData = JSON.parse(body);

                const users = readUsers();

                const newUser = {
                    id:
                        users.length > 0
                            ? Math.max(...users.map(user => user.id)) + 1
                            : 1,

                    name: newUserData.name,
                    age: newUserData.age
                };

                users.push(newUser);

                writeUsers(users);

                sendJSON(res, 201, {
                    message: "User created successfully",
                    user: newUser
                });

            } catch (error) {

                sendJSON(res, 400, {
                    message: "Invalid JSON data"
                });
            }
        });

        return;
    }

    // PUT USER
    if (req.method === "PUT" && req.url.startsWith("/users/")) {

        const id = Number(req.url.split("/")[2]);

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            try {

                const updatedData = JSON.parse(body);

                const users = readUsers();

                const index = users.findIndex(
                    user => user.id === id
                );

                if (index === -1) {

                    return sendJSON(res, 404, {
                        message: "User not found"
                    });
                }

                users[index] = {
                    ...users[index],
                    ...updatedData,
                    id: id
                };

                writeUsers(users);

                sendJSON(res, 200, {
                    message: "User updated successfully",
                    user: users[index]
                });

            } catch (error) {

                sendJSON(res, 400, {
                    message: "Invalid JSON data"
                });
            }
        });

        return;
    }

    // DELETE USER
    if (req.method === "DELETE" && req.url.startsWith("/users/")) {

        const id = Number(req.url.split("/")[2]);

        const users = readUsers();

        const userExists = users.some(
            user => user.id === id
        );

        if (!userExists) {

            return sendJSON(res, 404, {
                message: "User not found"
            });
        }

        const updatedUsers = users.filter(
            user => user.id !== id
        );

        writeUsers(updatedUsers);

        return sendJSON(res, 200, {
            message: "User deleted successfully"
        });
    }

    // 404
    sendJSON(res, 404, {
        message: "Route not found"
    });
});

server.listen(PORT, () => {
    console.log(
        `Server is running at http://localhost:${PORT}`
    );
});