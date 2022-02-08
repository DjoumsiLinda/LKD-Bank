-- sudo service postgresql start
-- createdb lkd_bank
-- psql -d lkd_bank -f server/tables/users.sql
-- heroku pg:psql -f server/tables/users.sql
DROP TABLE IF EXISTS reset_password;
DROP TABLE IF EXISTS users;

-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ users tables
CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR NOT NULL CHECK (first != ''),
      last VARCHAR NOT NULL CHECK (last != ''),
      email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
      password VARCHAR NOT NULL CHECK (password != ''),
      iban TEXT  NOT NULL CHECK (iban != ''), 
      url VARCHAR ,
      bio TEXT,
      status TEXT NOT NULL CHECK (status != ''),
      pass VARCHAR  NOT NULL CHECK (pass != ''),
      balance REAL  NOT NULL CHECK (balance != 0),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (first, last, email, password, bio, iban, status,pass, balance) VALUES (
    'usertest',
    'usertest',
    'reminiscent.gull+test@spicedling.email',
    '$2a$12$wi/mE7K0T8Z.0bPCFRbUxu8l3fIZTTcaakoa6uIiWjtGS/1.caRyq',
    '😯😎😊', 
    'DE89 3704 0044 0532 0130 00',
    'student',
    'null',
    100
);

INSERT INTO users (first, last, email, password, url, bio, iban, status,pass, balance) VALUES (
    'Corona',
    'Virus',
    'reminiscent.gull+coronaVirus@spicedling.email',
    '$2a$12$pTK3hJoLSGAznK40FIQqpO5m1Z6CbGV7qOikJw9s5W/42ESVmgjce',
    'https://spicedling.s3.amazonaws.com/BWVu6wHcKHRvQ5_13TEkLT74WUYEzs1h.jpeg',
    'Expert in Frontend',
    'DE89 3704 0044 0532 0130 01',
    'student',
    'null',
    100
);

INSERT INTO users (first, last, email, password, bio, iban, status,pass, balance) VALUES (
    'Corona',
    'Virus',
    'reminiscent.gull@spicedling.email',
    '$2a$12$wi/mE7K0T8Z.0bPCFRbUxu8l3fIZTTcaakoa6uIiWjtGS/1.caRyq',
    'Full Stack Developer',
    'DE89 3704 0044 0532 0130 02',
    'firm',
    'null',
    100
); 