const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  // With this solution node will try to load the entire file
  // into memory
  // fs.readFile("test-file.txt", "utf-8", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution2: Streams
  // Instead of reading the data in a variable and store
  // that variable into memory we will just create a
  // readable stream
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  //
  // readable.on("end", () => {
  //   res.end();
  // });
  //
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  // //   res.end("File not found");
  // });

  // Solution3
  // We need a readableSource.pipe(writeableDest)
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "localhost", () => {
  console.log("Listen...");
});
