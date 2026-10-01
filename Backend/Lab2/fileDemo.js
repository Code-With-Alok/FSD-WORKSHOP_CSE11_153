const fs = require("fs");

const fileName = "demo.txt";

// CREATE
fs.writeFileSync(fileName, "Hello, this file was created using Node.js fs module.");
console.log("1. File created successfully.");

// READ
let data = fs.readFileSync(fileName, "utf8");
console.log("2. File content:");
console.log(data);

// UPDATE
fs.appendFileSync(fileName, "\nThis line was added during the update operation.");
console.log("3. File updated successfully.");

data = fs.readFileSync(fileName, "utf8");
console.log("Updated file content:");
console.log(data);

// DELETE
fs.unlinkSync(fileName);
console.log("4. File deleted successfully.");

console.log("CRUD operations completed.");