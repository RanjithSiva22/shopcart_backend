var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { validateUser, loginUser } = require('../validation');



router.post('/register', async (req, res) => {
    console.log('hitting the route -----------------------------');
    const response = validateUser(req.body);
    if (response.error) {
        return res.status(400).send(response.error.details[0].message);
        // console.log(response.error.details);
        // res.send(response.error.details[1].message);
    }

    const duplicateuser = await User.findOne({ email: req.body.email });
    if (duplicateuser) return res.status(400).send("Email already exists");
    // else
    // {
    //     console.log("Validated Data")
    //     res.send(response);
    // }

    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpwd
    })
    try {
        // console.log("initiating save command -------------------------");
        const savedUser = await user.save();
        console.log(savedUser);
        // console.log("saved dacoments-------------------------------");
        return res.send("sucess");

        // console.log('returning -------------------------');
        // res.send("done");
    } catch (err) {
        // console.log(err,"-------------------------error");
        return res.status(400).json(err);
    }
});


router.post('/login', async (req, res) => {
    const response = loginUser(req.body);
    if (response.error)
        return res.status(400).send(response.error.details[0].message);
    console.log('no');
    try {
        const emailvalid = await User.findOne({ email: req.body.email });
        if (!emailvalid) return res.status(400).send("Email not exists");
        var msg = await bcrypt.compare(req.body.password, emailvalid.password);
        console.log(msg);
        if (!msg) return res.status(400).send("Password wrong");

        const token = jwt.sign({ _id: emailvalid.id }, process.env.tokenkey);
        res.header('auth-token', token).send("sucess " + token + " " + req.body.email);

    } catch (err) {
        console.log(err);
        res.send(err);
    }




    // res.send("loged in");

});

module.exports = router;