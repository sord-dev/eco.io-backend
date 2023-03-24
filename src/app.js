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
      "create db",
      "build auth",
      "hash passwords",
      "allow storage, creating, updating and deleting of events",
      "allow storage, creating, updating and deleting of users",
    ],
    done: [],
  });
});

app.use('/auth', userRouter);

module.exports = app;
