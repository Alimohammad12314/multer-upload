const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
require("dotenv").config();
const express=require('express');
//configuring aws s3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  bucket: process.env.BUCKET,
});

const s3 = new AWS.S3({});
//creating s3 instance

const upload = multer({
  //using multer s3 to handle upload
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

const app = express();

const mediafiles = require("./db.js");


app.post("/upload", upload.single("img"), (req, res, next) => {
  try {
    const file = req.file;
    console.log(file);
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file selected" });
    }
    res.send(file.location);
  }
    catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
