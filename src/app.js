const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/authRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.json({
    todo: [
      "allow updating and deleting of users",
      "allow storage, creating, updating and deleting of events",
    ],
    done: [
      "allow storage, creating of users",
      "create db",
      "build auth",
      "hash passwords",
    ],
  });
});

app.use("/auth", userRouter);

module.exports = app;
