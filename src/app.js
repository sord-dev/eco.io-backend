const { db } = require("./config/postgresdb");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);

let pgStore = new pgSession({
  pool: db,
  createTableIfMissing: true
})

const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes"); 

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
    store: pgStore,
    cookie: { sameSite: 'None', secure: true },
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

// routes
app.get('/', index)
app.use('/home', homeRoutes);
app.use("/auth", authRoutes);
app.use("/events", eventRouter);
app.use('/users', userRouter);


module.exports = app;
