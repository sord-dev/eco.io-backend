const userRouter = require('express').Router();

const protectRoute = require("../middleware/protectRoute");
const controller = require('../controllers/userController.js')

// GET users/top - get the top 10 users ordered by events attended
userRouter.get('/top', controller.getTopUsers);

// GET users/bookings - get all the users bookings depending on who's signed in
userRouter.get('/bookings', protectRoute, controller.getUserBookings);

// GET users/bookings - get the top 10 users ordered by events attended
userRouter.get('/bookings/all', protectRoute, controller.getAllBookings);


module.exports = userRouter;