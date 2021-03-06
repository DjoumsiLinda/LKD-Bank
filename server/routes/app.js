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
        fileSize: 2097152, //2MB
    },
});
router.get("/app.json", (req, res) => {
    db.getUsers(req.session.userId)
        .then((results) => {
            res.json(results.rows[0]);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
});

router.post(
    "/uploader.json",
    uploader.single("file"),
    s3.s3Uploader,
    (request, response) => {
        if (!request.file) {
            response.sendStatus(500);
        }
        const url =
            "https://spicedling.s3.amazonaws.com/" + request.file.filename;
        db.addImageInUsersTable(url, request.session.userId)
            .then((result) => {
                if (result) {
                    response.json(url);
                }
            })
            .catch((e) => {
                console.log(e);
                response.sendStatus(500);
            });
    }
);

router.post("/bioEditor.json", (req, res) => {
    const { bio } = req.body;
    db.addBio(bio, req.session.userId)
        .then((update) => {
            res.json(update.rowCount);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.get("/userProfile/:id.json", (req, res) => {
    if (req.params.id === `${req.session.userId}`) {
        return res.json({ sameId: true });
    }

    db.getUsers(req.params.id)
        .then((results) => {
            res.json(results.rows[0]);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(404);
        });
});

router.get("/logout.json", (req, res) => {
    console.log("logout: ", req.session);
    req.session.userId = undefined;
    console.log("logout: ", req.session);
    res.sendStatus(200);
});

router.get("/delete.json", s3.s3deleteUrl, (req, res) => {
    db.deleteComments(req.session.userId).then(() => {
        db.deleteMessages(req.session.userId).then(() => {
            db.deleteCredit(req.session.userId).then(() => {
                db.deleteTransfer(req.session.userId).then(() => {
                    db.deleteUsers(req.session.userId).then(() => {
                        req.session.userId = undefined;
                        res.sendStatus(200);
                    });
                });
            });
        });
    });
});
router.post("/InPause.json", (req, res) => {
    const { pause } = req.body;
    db.setPauseInUsers(pause, req.session.userId)
        .then((update) => {
            res.json(update.rowCount);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;
