const bcrypt = require("bcrypt");

const User = require("../models/user");
const Booking = require("../models/Booking");

async function register(req, res) {
  try {
    const data = req.body;

    const salt = await bcrypt.genSalt();

    // Hash the password
    data["password"] = await bcrypt.hash(data["password"], salt);

    const user = await User.create(data);

    user["password"] = null;
    req.session.authenticated = true;
    req.session.user = user;
    res.status(201).send(req.session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;

  if (!data.username || !data.password) {
    return res.status(422).json({ error: "Incorrect input." });
  }

  try {
    const user = await User.getOneByUsername(data.username);

    if (req.session.authenticated) {
      return res.status(200).json(req.session);
    }

    const comparePassword = await bcrypt.compare(
      data.password,
      user["password"]
    );

    if (!comparePassword) {
      throw new Error("Incorrect credentials.");
    }

    user["password"] = null;
    req.session.authenticated = true;
    req.session.user = user;
    return res.status(200).json(req.session);
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
}

async function logout(req, res) {
  if (req.session.authenticated) {
    req.session.authenticated = false;
    req.session.user = {};

    return res.status(200).json(req.session);
  } else {
    return res.status(400).json({ message: "ur not logged in." });
  }
}

async function getTopUsers(req, res) {

  try {
    let users = await User.listTopUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

}

async function getUserBookings(req, res) {
  try {
    let bookings = await Booking.getUserBookings(req.session.user.user_id)
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function getUserBookingsHistory(req, res) {
  try {
    let bookings = await Booking.getUserBookingsHistory(req.session.user.user_id)
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// test route
async function getAllBookings(req, res) {
  if (!req.session.user.isAdmin) {
    return res.status(401).json({ error: 'Unauthorised' })
  }

  try {
    let users = await Booking.getAllBookings()
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

}

async function createBooking(req, res) {
  let { body } = req;
  try {
    let response = await Booking.create(body);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

}

module.exports = {
  register,
  login,
  logout,
  getTopUsers,
  getUserBookings,
  getAllBookings,
  getUserBookingsHistory,
  createBooking
};
