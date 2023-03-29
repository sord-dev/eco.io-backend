require('dotenv').config()
const { Pool } = require('pg');

const db = new Pool({
    connectionString: process.env.DB_URL
})

let populateTestDBEnv = async () => {
    // insert user data
    await db.query("INSERT INTO pg_temp.users (username, password, email, isAdmin) VALUES ('admin', '$2b$10$wgc2myC/L8NmDGsfmonl1.2jlN2L8pWauyQG9XNoLUmjtlztr0kVy', 'admin@gmail.com', true);")

    // insert event data
    await db.query("INSERT INTO pg_temp.events (owner_id, upvotes, title, description, location) VALUES (1, 0, 'This is a test event.', 'I repeat, this is a test event. This description is just dummy text in order to make it look like there is some kind of even being described. If youve read this far I dont know wheather to commend or question you...', 'London'), (1, 0, 'This is another test event.', 'I repeat, this is yet another test event. This description is just dummy text in order to make it look like there is some kind of even being described. If youve read this far I dont know wheather to commend or question you...', 'London');")

    // insert bookings data
    await db.query("INSERT INTO pg_temp.bookings (user_id, event_id) VALUES (1, 1), (2, 1), (2, 2), (1, 2)")
}

const createTestDBEnv = async () => {
    await db.query(`CREATE TEMPORARY TABLE bookings (LIKE bookings INCLUDING ALL);`)
    await db.query(`CREATE TEMPORARY TABLE events (LIKE events INCLUDING ALL);`)
    await db.query(`CREATE TEMPORARY TABLE users (LIKE users INCLUDING ALL);`)

    populateTestDBEnv();
}

const destroyTestDBEnv = async () => {
    await db.query('DROP TABLE IF EXISTS pg_temp.events');
    await db.query('DROP TABLE IF EXISTS pg_temp.users');
    await db.query('DROP TABLE IF EXISTS pg_temp.bookings');
}

module.exports = { db, createTestDBEnv, destroyTestDBEnv };