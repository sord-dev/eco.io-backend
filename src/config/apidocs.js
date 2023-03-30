let stringDocs = {
    message: 'Welcome to the eco.io api, check out the routes below:',
    routes: {
        "/": '<-- you are here',
        "/home": [
            ["GET /home/", "get top 3 upvoted events"]
        ],
        "/auth": [
            ["POST /auth/register", "create account include these values { username, email, password }"],
            ["POST /auth/login ", "login to account include these values { username, password }"],
            ["GET /auth/logout", "log out of an account and clear user session data"]
        ],
        "/events": [
            ["GET events/all", "get all unapproved events"],
            ["GET events/a/all", "get all approved events"],
            ["PATCH events/v/:event_id", "upvote or downvote an event"],
            ["GET events/", "get an account's events"],
            ["POST events/", "create an event"],
            ["DELETE events/:event_id", "delete an existing event"],
        ],
        "/users": [
            ["GET users/top", "get the top 10 users ordered by events attended"],
            ["GET users/bookings", "get all the users bookings depending on who's signed in"],
            ["POST users/bookings/", "create a booking { user_id, event_id } - needs improving"],
            ["GET users/h/bookings", "get all the users attended bookings depending on who's signed in"],
        ]
    }
}

module.exports = stringDocs;
