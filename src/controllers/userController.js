const bcrypt = require("bcrypt");

const User = require("../models/user");

async function register(req, res) {
  try {
    const data = req.body;

    const salt = await bcrypt.genSalt();

    // Hash the password
    data["password"] = await bcrypt.hash(data["password"], salt);

    const result = await User.create(data);

    res.status(201).send(result);
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

module.exports = {
  register,
  login,
  logout,
};
