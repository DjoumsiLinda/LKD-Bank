const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db.js");
const router = express.Router();

router.post("/profileEdit.json", (request, response) => {
    const { first, last, email, city, password, age, status } = request.body;
    if (password) {
        //Password hash
        bcrypt.hash(password, 12).then((digest) => {
            //console.log("Hash Password:", digest, request.session.userId);
            db.updateUsersWithPassword(
                first,
                last,
                city,
                age,
                email,
                digest,
                request.session.userId,
                status
            )
                .then(() => {
                    response.sendStatus(200);
                })
                .catch((err) => {
                    console.log(err);
                    response.sendStatus(500);
                });
        });
    } else {
        //console.log("Not UPDATE PASSWORD");
        db.updateUsersWithoutPassword(
            first,
            last,
            city,
            age,
            email,
            request.session.userId,
            status
        )
            .then(() => {
                response.sendStatus(200);
            })
            .catch((err) => {
                console.log(err);
                response.sendStatus(500);
            });
    }
});
module.exports = router;
