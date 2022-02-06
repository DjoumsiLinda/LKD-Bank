const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db.js");
const router = express.Router();

router.post("/registration.json", (req, res) => {
    const { first, last, email, password } = req.body;
    console.log("Server:", first, last, email, password);
    if (!first || !last || !email || !password) {
        res.sendStatus(500);
    }
    if (first && last && email && password) {
        bcrypt.hash(password, 12).then((digest) => {
            db.addUser(first, last, email, digest)
                .then((result) => {
                    console.log("gut", result.rows[0]);
                    req.session.userId = result.rows[0].id;
                    console.log("Session: ", req.session);
                    res.json(result.rows[0].id);
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                });
        });
    }
});
module.exports = router;
