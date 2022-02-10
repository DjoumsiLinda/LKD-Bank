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
module.exports.addStatusAndPass = (status, pass, id, iban, age, city) => {
    return db.query(
        `UPDATE users
        SET status = $1, pass=$2, iban=$4, age=$5, city=$6, balance=100
        WHERE id=$3;`,
        [status, pass, id, iban, age, city]
    );
};
module.exports.getUsers = (id) => {
    return db.query(
        `SELECT id, first, last, age, city, pause, email, url, bio, status, iban,balance, 
        (select sum (amount) as credit from credit where users_id=$1 ) FROM users where id = $1;`,
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
module.exports.updateUsersWithPassword = (
    first,
    last,
    city,
    age,
    email,
    password,
    id,
    status
) => {
    return db.query(
        `UPDATE users
        SET first = $1, last = $2,city=$3, age=$4, email = $5, password = $6, status=$8
        WHERE id = $7;`,
        [first, last, city, age, email, password, id, status]
    );
};
module.exports.updateUsersWithoutPassword = (
    first,
    last,
    city,
    age,
    email,
    id,
    status
) => {
    return db.query(
        `UPDATE users
        SET first = $1, last = $2,city=$3, age=$4, email = $5, status=$7
        WHERE id = $6;`,
        [first, last, city, age, email, id, status]
    );
};
module.exports.deleteUsers = (id) => {
    return db.query(`delete from users where id=$1`, [id]);
};
module.exports.setPauseInUsers = (pause, id) => {
    return db.query(
        `UPDATE users
        SET pause = $1
        WHERE id = $2;`,
        [pause, id]
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
module.exports.deleteTransfer = (id) => {
    return db.query(`delete from transfer where users_id=$1`, [id]);
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
module.exports.deleteCredit = (id) => {
    return db.query(`delete from credit where users_id=$1`, [id]);
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ messages
module.exports.getLastChatMessages = () => {
    return db.query(
        `SELECT messages.id, messages.message, messages.created_at, messages.users_id, users.first,  users.last, users.url
        FROM messages
		JOIN users
        ON users.id=messages.users_id ORDER BY messages.created_at DESC LIMIT 10;`
    );
};
module.exports.addMessages = (message, users_id) => {
    return db.query(
        `INSERT INTO messages (message, users_id)
        VALUES($1, $2)
        RETURNING id, created_at;`,
        [message, users_id]
    );
};
module.exports.deleteMessages = (user_id) => {
    return db.query(`delete from messages where users_id=$1`, [user_id]);
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ comments
module.exports.getComments = () => {
    return db.query(
        `SELECT comments.created_at,comments.messages_id,comments.id,comments.messages, users.first, users.last  from comments join users on users.id=comments.users_id;`
    );
};
