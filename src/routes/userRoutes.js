const userRouter = require('express').Router();

const protectRoute = require("../middleware/protectRoute");
const controller = require('../controllers/userController.js')

// GET users/top - get the top 10 users ordered by events attended
userRouter.get('/top', controller.getTopUsers);


module.exports = userRouter;