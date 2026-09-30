const EventEmitter = require("events");

class Button extends EventEmitter {}

const button = new Button();

button.on("click", () => {
    console.log("Button clicked!");
});

button.on("doubleClick", () => {
    console.log("Button double-clicked!");
});

console.log("Simulating DOM-like events in Node.js...");

button.emit("click");
button.emit("doubleClick");