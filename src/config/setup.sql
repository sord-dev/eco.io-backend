DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(60) UNIQUE NOT NULL,
    email VARCHAR(120) NOT NULL,
    password VARCHAR(140) NOT NULL,
    events_attended INT DEFAULT 0,
    isAdmin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

-- user 1 = admin, admin, admin@gmail.com, user 2 -- user, test123 test_user@gmail.com
INSERT INTO users (username, password, email, isAdmin, events_attended) VALUES ('admin', '$2b$10$wgc2myC/L8NmDGsfmonl1.2jlN2L8pWauyQG9XNoLUmjtlztr0kVy', 'admin@gmail.com', true, 70), ('Steve', '$2b$10$Rg2AXCBalbVJb8p1eQZOL.Aq/Ir/RRU8tT17OvBHZtpSqL6mM4YJO', 'test_user@gmail.com', false, 32), ('Stef', '$2b$10$Rg2AXCBalbVJb8p1eQZOL.Aq/Ir/RRU8tT17OvBHZtpSqL6mM4YJO', 'test_user223@gmail.com', false, 47), ('Vitali', '$2b$10$Rg2AXCBalbVJb8p1eQZOL.Aq/Ir/RRU8tT17OvBHZtpSqL6mM4YJO', 'test_user22321@gmail.com', false, 90);

CREATE TABLE events (
    event_id INT GENERATED ALWAYS AS IDENTITY,
    owner_id INT NOT NULL,
    upvotes INT DEFAULT 0,
    title VARCHAR(80) NOT NULL,
    description VARCHAR(280) NOT NULL,
    location VARCHAR(80) NOT NULL,
    approved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (owner_id) REFERENCES users (user_id),
    PRIMARY KEY (event_id)
);

INSERT INTO events (owner_id, upvotes, title, description, location) VALUES (1, 0, 'Library Restoration Project', 'The library is currently running low on staff to help out with keeping the place ran well. Were organising a project to re-excite people about learning!', 'London'), (1, 0, 'Library Restoration Project', 'The library is currently running low on staff to help out with keeping the place ran well. Were organising a project to re-excite people about learning!', 'London');

CREATE TABLE bookings (
  booking_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  attended BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (event_id) REFERENCES events (event_id),
  PRIMARY KEY (booking_id)
);

INSERT INTO bookings (user_id, event_id) VALUES (1, 1), (2, 1), (2, 2), (1, 2)