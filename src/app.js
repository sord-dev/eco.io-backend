const express = require("express");
const cors = require("cors");
const session = require("express-session");
const store = new session.MemoryStore();

const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

function index(req, res) {
  let data = {
    message: 'Welcome to the eco.io api, check out the routes below:',
    routes: {
      "/": 'you are here',
      "/auth": [
        ["POST /auth/register", "create account include these values { username, email, password }"],
        ["POST /auth/login ", "login to account include these values { username, password }"],
        ["GET /auth/logout", "log out of an account and clear user session data"]
      ],
      "/events": [
        ["GET events/all", "get all unapproved events"],
        ["GET events/a/all", "get all approved events"],
        ["PATCH events/v/:event_id", "upvote or downvote an event"],
        ["GET events/", "get an account's events"],
        ["POST events/", "create an event"],
        ["DELETE events/:event_id", "delete an existing event"],
      ],
      "/users": [
        ["GET users/top", "get the top 10 users ordered by events attended"],
        ["GET users/bookings", "get all the users bookings depending on who's signed in"],
        ["POST users/bookings/", "create a booking { user_id, event_id } - needs improving"],
        ["GET users/h/bookings", "get all the users attended bookings depending on who's signed in"],
      ]
    }
  }

  return res.status(200).json(data)
}

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
app.use('/', index)
app.use("/auth", authRoutes);
app.use("/events", eventRouter);
app.use('/users', userRouter);


module.exports = app;
