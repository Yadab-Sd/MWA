const child_process = require("child_process");
console.log("Start:");

const anotherNewProcess = child_process.spawn("node", ["fibonacci.js"], {
  stdio: "inherit",
});

console.log("End:");
