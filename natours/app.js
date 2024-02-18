const express = require("express");
const morgan = require("morgan");
const app = express();

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// MIDDLEWARE
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api/v1/tours", tourRouter); // MIDDLEWARE
app.use("/api/v1/users", userRouter); // MIDDLEWARE

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
