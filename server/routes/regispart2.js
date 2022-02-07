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
        console.log(req.file);
        if (!req.file) {
            res.sendStatus(500);
        }
        const { status } = req.body;
        console.log("Server:", status);
        if (!status) {
            res.sendStatus(500);
        }
        if (status) {
            const pass =
                "https://spicedling.s3.amazonaws.com/" + req.file.filename;
            db.addStatusAndPass(status, pass, req.session.userId).then(
                (result) => {
                    if (result) {
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
        console.log(req.file);
        if (!req.file) {
            res.sendStatus(500);
        }
        const url = "https://spicedling.s3.amazonaws.com/" + req.file.filename;
        db.addImageInUsersTable(url, req.session.userId)
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
