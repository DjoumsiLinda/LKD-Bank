const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.post("/transfer.json", (req, res) => {
    const { sender_name, amount, iban, date, time, purpose } = req.body;
    if (!sender_name || !amount || !iban) {
        return res.sendStatus(500);
    }
    const id = req.session.userId;
    db.addTransfer(sender_name, amount, iban, date, time, purpose, id)
        .then(() => {
            //ajouter de lautre cote
            db.plusBalance(iban, amount).then(() => {
                //diminuer
                db.minusBalance(req.session.userId, amount).then((erg) => {
                    return res.json(erg.rows[0]);
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});
router.get("/getTransfer.json", (req, res) => {
    db.getTransfer(req.session.userId)
        .then((results) => {
            res.json(results.rows);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
});
router.get("/getReceivedTransfer/:iban.json", (req, res) => {
    db.getReceivedTransfer(req.params.iban)
        .then((results) => {
            res.json(results.rows);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
});
module.exports = router;
