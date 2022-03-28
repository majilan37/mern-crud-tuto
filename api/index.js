require("dotenv").config();
require("colors");
const express = require("express");
const { errorHandler } = require("./middleware/error");
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const connectDB = require("./config/db");
const path = require("path");

// app config
const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(errorHandler);

// endpoints
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);

// DB config
connectDB();

// Server frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production");
  });
}

// listner
app.listen(PORT, () => console.log(`app runnig on ${PORT}`.blue.bold));
