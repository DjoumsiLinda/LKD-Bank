const express = require("express");
const db = require("../db.js");
const path = require("path");
const router = express.Router();
const s3 = require("../s3.js");
const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 9097152,
    },
});
router.post(
    "/regis_part2.json",
    uploader.single("pass"),
    s3.s3Uploader,
    (req, res) => {
        if (!req.file) {
            res.sendStatus(500);
        }
        const { status, age, city, userId } = req.body;
        if (!status || !age || !city || !userId) {
            res.sendStatus(500);
        }
        if (status) {
            const pass =
                "https://spicedling.s3.amazonaws.com/" + req.file.filename;
            const iban = writeIBAN();
            db.addStatusAndPass(status, pass, userId, iban, age, city).then(
                (result) => {
                    if (result) {
                        req.session.userId = userId;
                        res.sendStatus(200);
                    }
                }
            );
        }
    }
);
router.post(
    "/regis_part2Pic.json",
    uploader.single("pic"),
    s3.s3Uploader,
    (req, res) => {
        if (!req.file) {
            res.sendStatus(500);
        }
        const { userId } = req.body;
        const url = "https://spicedling.s3.amazonaws.com/" + req.file.filename;
        db.addImageInUsersTable(url, userId)
            .then((result) => {
                if (result) {
                    res.json(url);
                }
            })
            .catch((e) => {
                console.log(e);
                res.sendStatus(500);
            });
    }
);
module.exports = router;
function writeIBAN() {
    var ktnr, iban;
    var pruef, pruef2;
    ktnr = Math.round(Math.random() * 8999999) + 1000000;
    pruef = ktnr * 1000000 + 43;
    pruef2 = pruef % 97;
    pruef = 98 - pruef2;
    if (pruef > 9) {
        iban = "DE";
    } else {
        iban = "DE0";
    }
    iban = iban + pruef + "70050000" + "000" + ktnr;
    return iban;
}
