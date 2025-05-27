const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(`Bearer`)
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(new ApiError(401, "Token does not exist!"));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decode.id).select("+password");
  if (!user) {
    return next(new ApiError(401, "Invalid token or authorization!"));
  }

  req.user = user;
  next();
});
  