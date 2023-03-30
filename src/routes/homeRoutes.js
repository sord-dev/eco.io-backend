const homeRouter = require('express').Router();

const controller = require('../controllers/eventController.js');

homeRouter.get("/", controller.getTopThreeEvents)



module.exports = homeRouter;
