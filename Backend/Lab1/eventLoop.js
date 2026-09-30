console.log("Start");

setTimeout(() => {
    console.log("setTimeout executed");
}, 0);

setImmediate(() => {
    console.log("setImmediate executed");
});

process.nextTick(() => {
    console.log("process.nextTick executed");
});

console.log("End");