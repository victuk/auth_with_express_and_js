var express = require('express');
var router = express.Router();
const { userCollection } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* GET home page. */
router.post('/register', async function(req, res, next) {
  try {
    console.log(req.body);
    const {fullName, username, password} = req.body;

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await userCollection.create({
      username, fullName, password: hashedPassword
    });

    res.status(201).send({
      successful: true,
      message: "Registered sucessfully"
    });

  } catch (error) {
    next(error);
  }
});


router.post("/login", async (req, res, next) => {
  try {
    const {username, password} = req.body;

    const user = await userCollection.findOne({username});

    if(!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send("passwords don't match");
    }

    

    const token = jwt.sign({
      userId: user._id,
      username: user.username,
      fullName: user.fullName
    }, process.env.SECRET);

    res.send({
      userDetails: {
        username: user.username,
        fullName: user.fullName
      },
      token
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
