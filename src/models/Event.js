const { db } = require('../config/postgresdb.js')
class Event {
  constructor({ event_id, owner_id, upvotes, title, description, location, approved }) {
    this.event_id = event_id;
    this.owner_id = owner_id;
    this.upvotes = upvotes;
    this.title = title;
    this.description = description;
    this.location = location;
    this.approved = approved;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM events WHERE approved = false ORDER BY upvotes DESC;");

    if (response.rows.length < 1) {
      throw new Error("Unable to locate events.");
    }

    return response.rows.map(e => new Event(e));
  }

  static async getTopThree() {
    const response = await db.query("SELECT * FROM events ORDER BY upvotes DESC LIMIT 3;");

    if (response.rows.length < 1) {
      throw new Error("Unable to locate events.");
    }

    return response.rows.map(e => new Event(e));
  }

  static async getAllApproved() {
    const response = await db.query("SELECT * FROM events WHERE approved = true ORDER BY upvotes DESC;");

    if (response.rows.length < 1) {
      throw new Error("No events found.");
    }

    return response.rows.map(e => new Event(e));
  }

  static async find(event_id) {
    const response = await db.query("SELECT * FROM events WHERE event_id = $1 LIMIT 1", [
      event_id,
    ]);

    if (response.rows.length != 1) {
      throw new Error("Unable to locate event.");
    }

    return new Event(response.rows[0]);
  }

  static async getUserEvents(user_id) {
    const response = await db.query("SELECT users.user_id, users.username, events.* FROM users JOIN events ON (users.user_id = events.owner_id) WHERE user_id = $1;", [
      user_id,
    ]);

    if (response.rows.length < 1) {
      throw new Error("Unable to locate events.");
    }

    return response.rows.map(e => new Event(e));
  }

  static async create(data) {
    let { owner_id, title, description, location } = data;

    const response = await db.query("INSERT INTO events (owner_id, title, description, location) VALUES ($1, $2, $3, $4) RETURNING *", [
      owner_id,
      title,
      description,
      location
    ]);

    if (response.rows.length < 1) {
      throw new Error("Unable to create event.");
    }

    return new Event(response.rows[0]);
  }

  async delete() {
    const response = await db.query(
      "DELETE FROM events WHERE event_id = $1 RETURNING *;",
      [this.event_id]
    );

    if (response.rows.length < 1) {
      throw new Error("Unable to delete event.");
    }

    return new Event(response.rows[0]);
  }

  static async update(event_id, updatedBody) {
    let { upvotes, title, description, location } =
      updatedBody;

    const response = await db.query(
      "UPDATE events SET upvotes=$1, title=$2, description=$3, location=$4 WHERE event_id=$7;",
      [upvotes, title, description, location, event_id]
    );

    if (response.rowCount !== 1) {
      throw new Error('Update Error')
    }

    return { vote: 'successful' };
  }

  async vote(vote) {
    const response = await db.query(
      "UPDATE events SET upvotes=$1 WHERE event_id=$2 RETURNING event_id;",
      [this.upvotes += vote, this.event_id]
    );

    if (response.rowCount !== 1) {
      throw new Error('Update Error')
    }

    return response.rows;
  }

  async approve(bool) {
    if (typeof bool !== 'boolean') {
      throw new TypeError('Approval takes boolean values only.')
    }

    const response = await db.query(
      "UPDATE events SET approved=$1 WHERE event_id=$2;",
      [bool, this.event_id]
    );

    if (response.rowCount !== 1) {
      throw new Error('Update Error')
    }

    return response.rows;
  }
}

module.exports = Event;
