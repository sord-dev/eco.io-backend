const eventRouter = require('express').Router();

const protectRoute = require("../middleware/protectRoute");
const controller = require('../controllers/eventController.js')


// GET events/all - get all events
eventRouter.get('/all', protectRoute, controller.getAllEvents);

// PATCH events/v/:event_id - upvote or downvote an event
eventRouter.patch('/v/:event_id', protectRoute, controller.upvoteEvent);

// GET events/ - get an account's events
eventRouter.get('/', protectRoute, controller.getUserEvents);

// POST events/ - create an event
eventRouter.post('/', protectRoute, controller.createEvent);

// DELETE events/:event_id - delete an existing event
eventRouter.delete('/:event_id', protectRoute, controller.deleteEvent);

module.exports = eventRouter;