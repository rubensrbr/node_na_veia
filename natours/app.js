const express = require("express");
const morgan = require("morgan");
const app = express();
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// MIDDLEWARE
// Just a function that handles/modify incoming data in the
// Request/Response cycle
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

// Will apply to every req
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api/v1/tours", tourRouter); // MIDDLEWARE
app.use("/api/v1/users", userRouter); // MIDDLEWARE

module.exports = app;
