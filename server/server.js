const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const path = require("path");

const appRouter = require("./routes/app.js");
const registration = require("./routes/registration.js");
const regis_part2 = require("./routes/regispart2.js");
const login = require("./routes/login.js");
const profileEdit = require("./routes/profileEdit.js");
const transfer = require("./routes/transfer.js");
const credit = require("./routes/credit.js");
const messages = require("./routes/messages.js");
const resetPassword = require("./routes/resetPassword.js");

app.use(compression());
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ cookieSession
// sessionSecret für heroku
let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    sessionSecret = require("./secrets.json").SESSION_SECRET;
}
app.use(
    cookieSession({
        secret: sessionSecret,
        sameSite: true, // prevents Cross Site Request Forgery (CSRF) attacks
    })
);

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "DENY");
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use((req, res, next) => {
    console.log("📢", req.method, req.url, req.session);
    next();
});
app.use(express.json());

app.use(appRouter);
app.use(registration);
app.use(regis_part2);
app.use(login);
app.use(credit);
app.use(transfer);
app.use(messages);
app.use(profileEdit);
app.use(resetPassword);

app.get("/user/id.json", (req, res) => {
    if (req.session.userId) {
        res.json({ userId: req.session.userId });
    } else {
        res.json({ userId: undefined });
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
