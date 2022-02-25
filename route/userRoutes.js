const router = require("express").Router();
const User = require("../model/user");
const { registerSchema, loginSchema } = require("../validators");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res) => {
    //validate data using Joi module before adding user to database
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0]);

    //check if user already exists in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res
            .status(400)
            .json({ status: "Failed", msg: "Email already exist" });

    //Hash password before storing in database, we use bcrypt module for that
    const salt = await bcrypt.genSalt(10); //generate salt to add in a hash(very irregular combination of string, numbers and special chars)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.status(201).json({ savedUser });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

router.post("/login", async (req, res) => {
    //validate email and password format using Joi before login
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0]);

    //check if user exist in database or not
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res
            .status(400)
            .json({ status: "Failed", msg: "Email does not exist" });

    //check if the password provided by user is equals to already existing password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res
            .status(400)
            .json({ status: "Login Failed", msg: "Incorrect password" });

    //using jsonwebtoken module to sign secret_token along with userid and then setting it in header for every request
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
        expiresIn: "20s",
    });
    res.header("auth-token", token);
    res.json({ jwtToken: token });
});

module.exports = router;
