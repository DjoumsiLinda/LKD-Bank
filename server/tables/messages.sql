-- sudo service postgresql start
-- createdb lkd_bank
-- psql -d lkd_bank -f server/tables/messages.sql
-- heroku pg:psql -f server/tables/messages.sql

DROP TABLE IF EXISTS messages;

CREATE TABLE messages(
   id SERIAL PRIMARY KEY,
   message VARCHAR NOT NULL CHECK (message != ''),
   users_id INT REFERENCES users(id) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
 

INSERT INTO messages (message, users_id) VALUES (
    'hello, I am happy to use this web',
    2
);
INSERT INTO messages (message, users_id) VALUES (
    'cool site web',
    3
);

INSERT INTO messages (message, users_id) VALUES (
    'i dont find it cool. i want to delete my account. how can i do it?',
    1
);
INSERT INTO messages (message, users_id) VALUES (
    'hey, i new here',
    2
);


