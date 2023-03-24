const db = require('../config/postgresdb.js')

class User {
  constructor({ user_id, username, email, password, isadmin }) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.isAdmin = isadmin;
  }

  static async getOneById(user_id) {
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { username, password, email, isAdmin } = data;
    let response = await db.query(
      "INSERT INTO users (username, password, email, isAdmin) VALUES ($1, $2, $3, $4) RETURNING user_id;",
      [username, password, email, isAdmin]
    );

    const newId = response.rows[0].user_id;

    const newUser = await User.getOneById(newId);
    
    return newUser;
  }
}

module.exports = User;