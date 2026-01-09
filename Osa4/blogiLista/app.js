require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

const app = express();
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "found" : "missing");

mongoose.connect(config.MONGODB_URI);

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
