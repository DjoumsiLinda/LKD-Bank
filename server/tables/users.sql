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
      url VARCHAR ,
      bio TEXT,
      status TEXT,
      pass VARCHAR,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (first, last, email, password, bio) VALUES (
    'usertest',
    'usertest',
    'reminiscent.gull+test@spicedling.email',
    '$2a$12$wi/mE7K0T8Z.0bPCFRbUxu8l3fIZTTcaakoa6uIiWjtGS/1.caRyq',
    '😯😎😊'
);

INSERT INTO users (first, last, email, password, url, bio) VALUES (
    'Corona',
    'Virus',
    'reminiscent.gull+coronaVirus@spicedling.email',
    '$2a$12$pTK3hJoLSGAznK40FIQqpO5m1Z6CbGV7qOikJw9s5W/42ESVmgjce',
    'https://spicedling.s3.amazonaws.com/BWVu6wHcKHRvQ5_13TEkLT74WUYEzs1h.jpeg',
    'Expert in Frontend'
);

INSERT INTO users (first, last, email, password, bio) VALUES (
    'Corona',
    'Virus',
    'reminiscent.gull@spicedling.email',
    '$2a$12$wi/mE7K0T8Z.0bPCFRbUxu8l3fIZTTcaakoa6uIiWjtGS/1.caRyq',
    'Full Stack Developer'
); 