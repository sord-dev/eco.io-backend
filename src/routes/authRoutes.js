const { Router } = require('express');

const userController = require('../controllers/userController.js');

const userRouter = Router();

// POST /auth/register - create account include these values { username, email, password, isAdmin }
userRouter.post("/register", userController.register);

// POST /auth/login - login to account include these values { username, password }
userRouter.post("/login", userController.login);

// GET /auth/logout - log out of an account and clear user session data
userRouter.get("/logout", userController.logout);

module.exports = userRouter;