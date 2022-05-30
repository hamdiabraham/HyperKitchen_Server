const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("You are not logged in! Please log in to get access.");
  }

  // 2) Verification token
  const validToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // const validToken = await jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findOne({ _id: validToken.id });
  // const currentUser = await User.findById(validToken.id);
  if (!currentUser) {
    throw new Error("the user is no longer exists", 401);
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles = ['admin', 'lead-guide'], role = 'user'
    if (!roles.includes(req.user.role)) {
      throw new Error("You do not have permission to perform this action");
      // forbidden
    }
    next();
  };
};
