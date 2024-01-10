const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("./../models");
const { createSendToken } = require("../utils/createSendToken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.protect = catchAsync(async (req, res, next) => {
  let token,
    auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) token = auth.split(" ")[1];
  if (!token) return next(new AppError("You are not logged in", 401));

  const id = (await promisify(jwt.verify)(token, process.env.JWT_SECRET)).id;
  const freshUser = await Users.findOne({ where: { id } });

  if (!freshUser)
    return next(
      new AppError("The user belonging to this token is no longer exists", 401)
    );

  req.user = freshUser;
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  const user = await Users.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppError("Incorrect username or password", 401));

  createSendToken(user, 200, res);
});

exports.signUp = catchAsync(async (req, res, next) => {
  var { email, password, firstName } = req.body;

  if (!email || !password || !firstName)
    return next(new AppError("Invalid Credentials", 400));
  if (password.length < 4)
    return next(new AppError("Validation length on password failed", 400));

  password = await bcrypt.hash(password, 12);
  const newUser = await Users.create({ firstName, email, password });

  createSendToken(newUser, 201, res);
});
