const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("greet", (name) => {
    console.log(`Hello ${name}! Welcome to Node.js Events.`);
});

myEmitter.on("exit", () => {
    console.log("Exit event triggered. Goodbye!");
});

myEmitter.emit("greet", "Alok");
myEmitter.emit("exit");