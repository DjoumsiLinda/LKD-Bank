const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const path = require("path");

const registration = require("./routes/registration.js");
const login = require("./routes/login.js");
const resetPassword = require("./routes/resetPassword.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ cookieSession
// sessionSecret für heroku
let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    sessionSecret = require("./secrets.json").SESSION_SECRET;
}
const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret,
    sameSite: true, // prevents Cross Site Request Forgery (CSRF) attacks
});
app.use((req, res, next) => {
    console.log("📢", req.method, req.url, req.session);
    next();
});
app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "DENY");
    next();
});

app.use(cookieSessionMiddleware);
app.use(express.json());
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(registration);
app.use(login);
app.use(resetPassword);

app.get("/user/id.json", (req, res) => {
    if (req.session) {
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
