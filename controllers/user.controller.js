const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signInToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.create({ username, email, password });

  //generate token;
  const token = signInToken(user._id);
  if (!token) {
    return next(new ApiError(500, "Failed to create token!"));
    console.log("Failed to create token");
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    status: "success",
    message: "User created successfully 🥳",
    data: {
      user,
    },
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ApiError(401, "Invalid email or password"));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("User or Password invalid", 401));
  }

  //generate token;
  const token = signInToken(user._id);
  if (!token) {
    return next(new ApiError(500, "Failed to create token!"));
    console.log("Failed to create token");
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  res.status(202).json({
    status: "success",
    message: "User logged in successfully 🥳",
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new ApiError(401, "Invalid email or password"));
  }
  res.status(205).json({
    status: "success",
    message: "User updated successfully 🥳",
  });
});
