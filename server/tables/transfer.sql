-- sudo service postgresql start
-- createdb lkd_bank
-- psql -d lkd_bank -f server/tables/transfer.sql
-- heroku pg:psql -f server/tables/transfer.sql
DROP TABLE IF EXISTS transfer;

CREATE TABLE transfer(
      id SERIAL PRIMARY KEY,
      sender_name TEXT NOT NULL CHECK (sender_name != ''),
      purpose TEXT NOT NULL CHECK (purpose != ''), 
      iban TEXT NOT NULL CHECK (iban != ''),
      amount REAL,
      transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      users_id INTEGER NOT NULL REFERENCES users(id),
      transfer_time TEXT 
);

INSERT INTO transfer (sender_name, purpose, iban, amount, users_id) VALUES (
    'usertest',
    'money borrow',
    'DE89 3704 0044 0532 0130 00',
    10,
    2
);

INSERT INTO transfer (sender_name, purpose, iban, amount, users_id) VALUES (
    'Corana Virus',
    'money loaned',
    'DE89 3704 0044 0532 0130 01',
    10, 
    1
);

