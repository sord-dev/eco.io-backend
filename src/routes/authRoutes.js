const { Router } = require('express');

const userController = require('../controllers/userController.js');

const authRoutes = Router();

// POST /auth/register - create account include these values { username, email, password, isAdmin }
authRoutes.post("/register", userController.register);

// POST /auth/login - login to account include these values { username, password }
authRoutes.post("/login", userController.login);

// GET /auth/logout - log out of an account and clear user session data
authRoutes.get("/logout", userController.logout);

module.exports = authRoutes;