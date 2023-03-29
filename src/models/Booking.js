const { db } = require('../config/postgresdb.js')

class Booking {
    constructor({ username, title, location, attended }) {
        this.username = username;
        this.title = title;
        this.location = location;
        this.attended = attended;
    }

    static async getUserBookings(user_id) {
        let sql = "SELECT users.username, events.title, events.location, attended FROM bookings JOIN users ON (bookings.user_id = users.user_id) JOIN events ON (bookings.event_id = users.user_id) WHERE bookings.user_id = $1 AND bookings.attended = false;"

        let response = await db.query(sql, [user_id]);

        if (response.rowCount < 1) {
            throw new Error('No bookings found.')
        }

        return response.rows.map(b => new Booking(b));
    }

    static async getUserBookingsHistory(user_id) {
        let sql = "SELECT users.username, events.title, events.location, attended FROM bookings JOIN users ON (bookings.user_id = users.user_id) JOIN events ON (bookings.event_id = users.user_id) WHERE bookings.user_id = $1 AND bookings.attended = true;"

        let response = await db.query(sql, [user_id]);

        if (response.rowCount < 1) {
            throw new Error('No bookings found.')
        }

        return response.rows.map(b => new Booking(b));
    }

    static async getAllBookings() {
        let sql = "SELECT users.username, events.title, events.location, attended FROM bookings JOIN users ON (bookings.user_id = users.user_id) JOIN events ON (bookings.event_id = users.user_id);"


        let response = await db.query(sql);

        if (response.rowCount < 1) {
            throw new Error('No bookings found.')
        }
        console.log(response.rows);

        return response.rows.map(b => new Booking(b));
    }

    static async create(data) {
        let { user_id, event_id } = data;

        let sql = "INSERT INTO bookings (user_id, event_id) VALUES ($1, $2) RETURNING booking_id;"

        let response = await db.query(sql, [user_id, event_id]);

        if (response.rowCount < 1) {
            throw new Error('Booking creation error')
        }

        console.log(response.rows);

        return response.rows;
    }

}

module.exports = Booking;
