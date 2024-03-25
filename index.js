var express = require("express");
var router = express.Router();
var studentRoute = require("./API/Routes/student");
const mongoose = require("mongoose");
var productRoute = require("./API/Routes/Product");
var usersRoute = require("./API/Routes/users.js");
const fileupload = require("express-fileupload");

mongoose.connect("mongodb://localhost:27017/myFirstReact");
mongoose.connection.on("error", (err) => {
  console.log("connection failed");
});

mongoose.connection.on("connected", (connected) => {
  console.log("connection was established");
});

router.use(fileupload({ useTempFiles: true }));

router.use("/student", studentRoute);
router.use("/product", productRoute);
router.use("/user", usersRoute);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    msg: "saved",
  });
});

router.use((req, res, next) => {
  res.status(404).json({
    msg: "bad request",
  });
});

module.exports = router;
