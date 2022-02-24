const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = res.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
    // try {
    //     const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    //     req.user = verified;
    //     next();
    // } catch (error) {
    //     res.status("400").send("Invalid token");
    // }
};
module.exports = auth;
