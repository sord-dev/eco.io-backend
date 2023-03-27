const express = require("express");
const cors = require("cors");
const session = require("express-session");
const store = new session.MemoryStore();

const userRouter = require("./routes/authRoutes");
const eventRouter = require("./routes/eventRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    resave: false,
    store
  })
);

// routes
app.get("/", (req, res) => {
  res.json({
    todo: [
      "allow updating and deleting of users",
    ],
    done: [
      "allow storage, creating, updating and deleting of events",
      "allow storage, creating of users",
      "create db",
      "build auth",
      "hash passwords",
      "get sessions working",
    ],
  });
});

app.use("/auth", userRouter);

app.use("/events", eventRouter);


module.exports = app;
