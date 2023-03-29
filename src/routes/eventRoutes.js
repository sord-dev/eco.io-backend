const eventRouter = require('express').Router();

const protectRoute = require("../middleware/protectRoute");
const controller = require('../controllers/eventController.js')

// GET events/all - get all unapproved events
eventRouter.get('/all', protectRoute, controller.getAllEvents);

// GET events/a/all - get all approved events
eventRouter.get('/a/all', protectRoute, controller.getAllApprovedEvents);

// PATCH events/v/:event_id - upvote or downvote an event
eventRouter.patch('/v/:event_id', protectRoute, controller.upvoteEvent);

// PATCH events/a/:event_id - AS AN ADMIN approve an event
eventRouter.patch('/a/:event_id', protectRoute, controller.approveEvent);

// GET events/ - get an account's events
eventRouter.get('/', protectRoute, controller.getUserEvents);

// POST events/ - create an event
eventRouter.post('/', protectRoute, controller.createEvent);

// DELETE events/:event_id - delete an existing event
eventRouter.delete('/:event_id', protectRoute, controller.deleteEvent);

module.exports = eventRouter;