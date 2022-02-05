-- sudo service postgresql start
-- createdb lkd_bank
-- psql -d lkd_bank -f server/tables/reset_password.sql
-- heroku pg:psql -f server/tables/reset_password.sql
DROP TABLE IF EXISTS reset_password;

-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ reset_codes tables
CREATE TABLE reset_password(
      id SERIAL PRIMARY KEY,
      email VARCHAR NOT NULL CHECK (email != ''),
      code VARCHAR NOT NULL CHECK (code != ''),
      users_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);