const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.get("/getMessages.json", (request, response) => {
    db.getLastChatMessages().then((result) => {
        response.json(result.rows.reverse());
    });
});

router.get("/getComments.json", (request, response) => {
    db.getComments()
        .then((result) => {
            response.json(result.rows.reverse());
        })
        .catch((err) => {
            console.log("errrrrr", err);
        });
});

router.post("/addMessages.json", (request, response) => {
    const { message } = request.body;
    console.log(message, request.session.userId);
    db.addMessages(message, request.session.userId).then((update) => {
        if (update.rows[0]) {
            db.getUsers(request.session.userId).then(() => {
                response.sendStatus(200);
            });
        }
    });
});
module.exports = router;
