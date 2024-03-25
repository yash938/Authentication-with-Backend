const express = require("express");
const router = express.Router();
const Student = require("../models/studentSchem");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  Student.find()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        msg: err,
      });
    });
});

router.get("/:id", (req, res) => {
  Student.findById(req.params.id)
  .then(result => {
    console.log(req.params.id);
    res.status(200).json({
      msg: result,
    });
  }).catch(err=>{
    res.status(500).json({
        error:err
    })
  })
});

router.post("/", function (req, res, next) {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
  });
  student
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newStudent: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
