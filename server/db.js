/*
-- https://bcrypt-generator.com/
-- sudo service lkd_bank start
-- createdb lkd_bank
*/
const spicedPg = require("spiced-pg");
//heroku
let connetionString = process.env.DATABASE_URL;
if (!connetionString) {
    connetionString = require("./secrets.json").connetionString;
}

const db = spicedPg(connetionString);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ users table
module.exports.addUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING id;`,
        [first, last, email, password]
    );
};
module.exports.addImageInUsersTable = (url, id) => {
    return db.query(
        `UPDATE users
        SET url = $1 
        WHERE id=$2;`,
        [url, id]
    );
};
module.exports.addStatusAndPass = (status, pass, id, iban) => {
    return db.query(
        `UPDATE users
        SET status = $1, pass=$2, iban=$4
        WHERE id=$3;`,
        [status, pass, id, iban]
    );
};
module.exports.getUsers = (id) => {
    return db.query(
        `SELECT id, first, last, email, url, bio, status, iban,balance FROM users where id = $1;`,
        [id]
    );
};

module.exports.getPassword = (email) => {
    return db.query(`SELECT id, password FROM users where email = $1;`, [
        email,
    ]);
};
module.exports.resetPassword = (password, email) => {
    return db.query(
        `UPDATE users
        SET password = $1
        WHERE email = $2;`,
        [password, email]
    );
};
module.exports.checkEmail = (email) => {
    return db.query(`SELECT id FROM users where email = $1;`, [email]);
};

module.exports.addBio = (bio, id) => {
    return db.query(
        `UPDATE users
        SET bio = $1
        WHERE id = $2;`,
        [bio, id]
    );
};
module.exports.minusBalance = (id, balance) => {
    return db.query(
        `UPDATE users
        SET balance = balance-$2 
        WHERE id=$1
        RETURNING balance;`,
        [id, balance]
    );
};
module.exports.plusBalance = (iban, amount) => {
    return db.query(
        `UPDATE users
        SET balance = balance + $2
        WHERE iban=$1
        RETURNING balance;`,
        [iban, amount]
    );
};
module.exports.plusCredit = (id, amount) => {
    return db.query(
        `UPDATE users
        SET balance = balance + $2
        WHERE id=$1
        RETURNING balance;`,
        [id, amount]
    );
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ reset_password table
module.exports.addCode = (email, code, users_id) => {
    return db.query(
        `INSERT INTO reset_password (email, code, users_id)
        VALUES($1, $2, $3)
        RETURNING id;`,
        [email, code, users_id]
    );
};
module.exports.getCode = (CodeId) => {
    return db.query(
        `SELECT code FROM reset_password where id = $1 and CURRENT_TIMESTAMP - created_at < INTERVAL '1 minutes';`,
        [CodeId]
    );
};

module.exports.deleteCode = (id) => {
    return db.query(`delete from reset_password where id=$1`, [id]);
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ transfert table
module.exports.addTransfer = (
    sender_name,
    amount,
    iban,
    date,
    time,
    purpose,
    users_id
) => {
    return db.query(
        `INSERT INTO transfer (sender_name,
            amount,
            iban,
            transfer_date,
            transfer_time,
            purpose,
            users_id)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;`,
        [sender_name, amount, iban, date, time, purpose, users_id]
    );
};
module.exports.getTransfer = (id) => {
    return db.query(`SELECT *  FROM transfer where users_id=$1;`, [id]);
};
module.exports.getReceivedTransfer = (iban) => {
    return db.query(`SELECT *  FROM transfer where iban=$1;`, [iban]);
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ credit table
module.exports.addCredit = (amount, users_id) => {
    return db.query(
        `INSERT INTO credit (
            amount,
            users_id)
        VALUES($1, $2)
        RETURNING id;`,
        [amount, users_id]
    );
};
