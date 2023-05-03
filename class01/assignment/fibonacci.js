const child_process = require("child_process");

function fibonacci(n) {
  if (n == -1 || n == 1) {
    return 1;
  }
  if (n == 0) {
    return 0;
  }
  return n < 0
    ? fibonacci(n + 2) - fibonacci(n + 1)
    : fibonacci(n - 1) + fibonacci(n - 2);
}

let inputNum = -4;
let result = fibonacci(inputNum);
console.log("Fibonacci of", inputNum, "is:", result);
