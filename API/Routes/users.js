const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userPost = require("../models/userData");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(200).json({
        error: err,     
      });
    } else {
      const User = new userPost({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hash, ////////important
        phone: req.body.phone,
        email: req.body.email,
        usertype: req.body.usertype,
      });
      User.save()
        .then((result) => {
          res.status(200).json({
            msg: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

router.post("/login", (req, res) => {
  userPost
    .find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          msg: "user not exist",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(400).json({
            msg: "password doesn't match",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              usertype: user[0].usertype,
              email: user[0].email,
              phone: user[0].phone,
            },
            "RANDOM TOKEN",
            { expiresIn: "24h" }
          );
          res.status(200).json({
            message: "login seccussfully",
            username: user[0].username,
            usertype: user[0].usertype,
            email: user[0].email,
            phone: user[0].phone,
            token: token,
          });
        }
      });
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    })
});

module.exports = router;
