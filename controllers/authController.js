const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  createSendToken(newUser, 201, req, res);
});

exports.loginPage = catchAsync(async (req, res, next) => {
  res.render("login/loginPage", {
    title: "Login",
  });
});

exports.loginAdmin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("email or password is required");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new Error("Invalid email or password!!");
  }

  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from the output
  user.password = undefined;

  return res.redirect("/dashboard");
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
  // res.redirect('/').json({ status: 'success' });
  // res.redirect('/');
};
