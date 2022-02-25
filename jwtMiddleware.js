const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");
    const verified = jwt.verify(
        token,
        process.env.SECRET_TOKEN,
        (err, user) => {
            if (err) return res.status(403).send("Invalid Token");
            req.user = user;
            next();
        }
    );
};
module.exports = auth;
