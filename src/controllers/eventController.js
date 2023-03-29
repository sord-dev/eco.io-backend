const Event = require('../models/Event.js')


// GET events/ - get an account's events
const getUserEvents = async (req, res) => {
    try {
        let response = await Event.getUserEvents(req.session.user.user_id)

        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

// GET events/all - get all
const getAllEvents = async (req, res) => {
    try {
        let response = await Event.getAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

// GET events/a/all - get all approved events
const getAllApprovedEvents = async (req, res) => {
    try {
        let response = await Event.getAllApproved();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

const deleteEvent = async (req, res) => {
    if (!req.session.user.isAdmin) {
        return res.status(401).json({ error: 'sorry buddy, admins only.' })
    }

    try {
        let event = await Event.find(req.params.event_id)

        if (event) {
            let deleted = await event.delete()

            return res.status(200).json(deleted);
        }

    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}
// POST events/ - create an event
const createEvent = async (req, res) => {
    if (!req.session.user.isAdmin) {
        return res.status(401).json({ error: 'sorry buddy, admins only.' })
    }

    let { body } = req;

    let data = { ...body, owner_id: req.session.user.user_id }

    try {
        let response = await Event.create(data)

        return res.status(201).json(response);
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

// POST events/:event_id - update owned events
const updateEvent = async (req, res) => {
    let { session } = req;
    if (!session.user.isAdmin) {
        return res.status(401).json({ error: 'sorry buddy, admins only.' })
    }

    let event = await Event.find(req.params.event_id);

    if (event) {
        // check if user owns event
        if (session.user.user_id !== event.owner_id) {
            return res.status(401).json({ error: 'sorry buddy, event owner only.' })
        }
        try {
            let updated = await Event.update(event.event_id, req.body);
            return res.status(204).json(updated);
        } catch (error) {
            return res.json(error);
        }
    } else {
        return res.json({ error: "Event not found." });
    }
}

// POST events/v/:event_id - upvote or downvote an event
const upvoteEvent = async (req, res) => {
    let { session, body } = req;

    let event = await Event.find(req.params.event_id);

    if (event) {
        // // check if user owns event
        // if (session.user.user_id === event.owner_id) {
        //     return res.status(401).json({ error: 'sorry buddy, cant vote on your own event.' })
        // }

        try {
            let vote = body.vote > 0 ? 1 : -1;

            let updated = await event.vote(vote);

            return res.status(204).json(updated);
        } catch (error) {
            return res.json(error);
        }
    } else {
        return res.json({ error: "Event not found." });
    }
}

// POST events/a/:event_id - AS AN ADMIN, approve an event
const approveEvent = async (req, res) => {
    let { session, body } = req;

    if (!session.user.isAdmin) {
        return res.status(401).json({ error: 'sorry buddy, admins only.' })
    }

    if (!body.approval) {
        return res.status(422).json({ error: 'incorrect input, please include an approval key with a boolean' })
    }

    let event = await Event.find(req.params.event_id);

    if (event) {

        try {
            let updated = await event.approve(body.approval);

            return res.status(200).json(updated);
        } catch (error) {
            return res.json(error);
        }
    } else {
        return res.json({ error: "Event not found." });
    }
}

module.exports = {
    getUserEvents,
    createEvent,
    deleteEvent,
    updateEvent,
    upvoteEvent,
    getAllEvents,
    approveEvent,
    getAllApprovedEvents
}