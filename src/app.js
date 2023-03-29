const express = require("express");
const cors = require("cors");
const session = require("express-session");
const store = new session.MemoryStore();

const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes"); 

function index(req, res) {
  let data = require('./config/apidocs.js')

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
