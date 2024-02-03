const fs = require("fs");
const http = require("http");

// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
//
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
//
// fs.writeFileSync("./txt/output.txt", textOut);
//
// console.log("File has been written!");

//Non-blocking, asynchronous way

fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("Will read file!");
