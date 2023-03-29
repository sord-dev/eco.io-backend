const express = require("express");
const cors = require("cors");
const session = require("express-session");
const store = new session.MemoryStore();

const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:2000', credentials: true }));
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
      "leaderboard functionality",
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

app.use("/auth", authRoutes);
app.use("/events", eventRouter);
app.use('/users', userRouter);


module.exports = app;
