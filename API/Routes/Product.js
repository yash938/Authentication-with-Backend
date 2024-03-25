const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
// Require the cloudinary library
//npm install cloudinary
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: "dby9oywcg",
  api_key: "421533583768444",
  api_secret: "GxjRznmhnsDwkNRP_GrSNB2eW-0",
});

// Log the configuration
console.log(cloudinary.config());

const Product = require("../models/Products");
//

router.get("/", checkAuth, (req, res, next) => {
  Product.find()
    .then((result) => {
      res.status(200).json({
        msg: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res) => {
  const file = req.files.photo; //
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    //
    console.log(result);                            //
  });
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    code: req.body.code,
    title: req.body.title,
    description: req.body.description,
    mrp: req.body.mrp,
    sp: req.body.sp,
    discountPrice: req.body.discountPrice,
    imagePath: result.url, // yha par cloudinary ese likhna hai
  });
  product
    .save()
    .then((result) => {
      res.status(200).json({
        msg: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//find by id router
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: result,
      });
    })
    .catch((err) => {
      console.log(err);
      error: err;
    });
});

//delete req
router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: result,
      });
    })
    .catch((err) => {
      error: err;
    });
});

// router.put("/:id", (req, res) => {
//   Product.findByIdAndUpdate(
//     { _id: req.params.id },
//     {
//       $set: {
//         code: req.body.code,
//         title: req.body.title,
//         description: req.body.description,
//         mrp: req.body.mrp,
//         sp: req.body.sp,
//         discountPrice: req.body.discountPrice,
//         imagePath: req.body.imagePath,
//       },
//     },
//     { new: true }
//   ).then(result=>{
//     console.log(result)
//     res.status(200).json({
//         msg:result
//     })
//   }).catch(err=>{
//     res.status(500).json({
//         error:err
//     })
//   })
// });
router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
