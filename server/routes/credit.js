const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.post("/credit.json", (req, res) => {
    const { amount } = req.body;
    if (!amount) {
        return res.sendStatus(500);
    }
    const id = req.session.userId;
    db.addCredit(amount, id)
        .then((erg) => {
            db.plusCredit(id, amount).then(() => {
                res.json(erg.rows[0]);
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});
module.exports = router;
