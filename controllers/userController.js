const User = require("../models/userModel");
const generateToken = require("../config/generatetoken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, confirmpassword } = req.body;

  if (!email || !password || !confirmpassword) {
    res.status(400);
    throw new Error("Please Enter All The Fields");
  }
  if (password !== confirmpassword) {
    res.status(400);
    throw new Error("{Passwords do not Match");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed To Create The User");
  }
  next();
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = { registerUser, authUser };
