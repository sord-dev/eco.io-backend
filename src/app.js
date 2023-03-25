const express = require("express");
const cors = require("cors");
const session = require("express-session");
const store = new session.MemoryStore()

const userRouter = require("./routes/authRoutes");
const protectRoute = require("./middleware/protectRoute");

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
      "allow storage, creating, updating and deleting of events",
      "get sessions working",
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
