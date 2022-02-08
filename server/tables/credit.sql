-- sudo service postgresql start
-- createdb lkd_bank
-- psql -d lkd_bank -f server/tables/credit.sql
-- heroku pg:psql -f server/tables/credit.sql
DROP TABLE IF EXISTS credit;

CREATE TABLE credit(
      id SERIAL PRIMARY KEY,
      amount REAL,
      credit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      users_id INTEGER NOT NULL REFERENCES users(id)
);