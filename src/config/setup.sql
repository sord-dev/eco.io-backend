DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(60) UNIQUE NOT NULL,
    email VARCHAR(120) NOT NULL,
    password VARCHAR(140) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);
-- user 1 = admin, admin, admin@gmail.com, user 2 -- user, test123 test_user@gmail.com
INSERT INTO users (username, password, email, isAdmin) VALUES ('admin', '$2b$10$wgc2myC/L8NmDGsfmonl1.2jlN2L8pWauyQG9XNoLUmjtlztr0kVy', 'admin@gmail.com', true), ('user', '$2b$10$Rg2AXCBalbVJb8p1eQZOL.Aq/Ir/RRU8tT17OvBHZtpSqL6mM4YJO', 'test_user@gmail.com', false);

CREATE TABLE events (
    event_id INT GENERATED ALWAYS AS IDENTITY,
    owner_id INT NOT NULL,
    upvotes INT DEFAULT 0,
    title VARCHAR(80) NOT NULL,
    description VARCHAR(280) NOT NULL,
    location VARCHAR(80) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users (user_id),
    PRIMARY KEY (event_id)
);

INSERT INTO events (owner_id, upvotes, title, description, location) VALUES (1, 0, 'This is a test event.', 'I repeat, this is a test event. This description is just dummy text in order to make it look like there is some kind of even being described. If you''ve read this far I don''t know wheather to commend or question you...', 'London'), (1, 0, 'This is another test event.', 'I repeat, this is yet another test event. This description is just dummy text in order to make it look like there is some kind of even being described. If you''ve read this far I don''t know wheather to commend or question you...', 'London');