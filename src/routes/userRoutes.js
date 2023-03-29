const userRouter = require('express').Router();

const protectRoute = require("../middleware/protectRoute");
const controller = require('../controllers/userController.js')

// GET events/all - get all events
userRouter.get('/top', controller.getTopUsers);


module.exports = userRouter;