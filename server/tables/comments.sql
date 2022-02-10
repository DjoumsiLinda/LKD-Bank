-- sudo service postgresql start
-- createdb lkd_bank
-- psql -d lkd_bank -f server/tables/comments.sql
-- heroku pg:psql -f server/tables/comments.sql
DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    messages VARCHAR NOT NULL,
    users_id INTEGER NOT NULL REFERENCES users(id),
    messages_id INTEGER NOT NULL REFERENCES messages(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO comments (messages, messages_id, users_id) VALUES (
    'log in and you can delete your account',
    3,
    2
);
INSERT INTO comments (messages, messages_id, users_id) VALUES (
    'you are welcome',
    4,
    1
);