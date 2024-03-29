const express = require("express");
const { upload } = require("../multer");
const router = express.Router();
const User = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require('../middleware/catchAssyncErrors');
const sendToken = require("../utils/jwtToken");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!req.file) {
    return next(new ErrorHandler("No file uploaded", 400));
  }

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "error deleting" });
      } 
    });
    return next(new ErrorHandler("user already exists", 400));
  }
  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
  };

  const activationToken = createActionToken(user);
  const activationUrl = `http://localhost:5173/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: 'Activate your account',
      text:`Hello ${user.name}, please click on the link to activate your account: ${activationUrl} `
    })
    res.status(200).json({
      success: true,
      message: `check your mail ${user.email} to activate the  account`
    })
  } catch (error) {
    return next(new ErrorHandler(err.message, 400))

  }

});

const createActionToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};

// activate user message
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("invalid Token", 400));
      }
      const { name, email, password, avatar } = newUser;
      await User.create({ name, email, password, avatar });
      sendToken(newUser, 201, res);
    } catch (error) {
      return next(new ErrorHandler(err.message, 500))
    }
  })
);

module.exports = router;
