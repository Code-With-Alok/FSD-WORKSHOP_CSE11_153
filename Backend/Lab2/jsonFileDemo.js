const fs = require("fs");

const fileName = "userData.json";

// READ JSON FILE
const data = fs.readFileSync(fileName, "utf8");
const users = JSON.parse(data);

console.log("Original User Data:");
console.log(users);

// CREATE / ADD NEW RECORD
const newUser = {
    id: 3,
    name: "Rahul",
    age: 21,
    course: "B.Tech CSE"
};

users.push(newUser);

fs.writeFileSync(fileName, JSON.stringify(users, null, 2));
console.log("\nNew user added successfully.");

// UPDATE RECORD
const userToUpdate = users.find(user => user.id === 1);

if (userToUpdate) {
    userToUpdate.age = 20;
}

fs.writeFileSync(fileName, JSON.stringify(users, null, 2));
console.log("User updated successfully.");

// DELETE RECORD
const updatedUsers = users.filter(user => user.id !== 2);

fs.writeFileSync(fileName, JSON.stringify(updatedUsers, null, 2));
console.log("User deleted successfully.");

console.log("\nFinal User Data:");
console.log(updatedUsers);