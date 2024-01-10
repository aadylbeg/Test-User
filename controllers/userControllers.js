const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");
const { v4 } = require("uuid");
const { Users } = require("../models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  let order = [["createdAt", "desc"]];

  const users = await Users.findAll({
    order,
    limit: 10,
    offset: (page - 1) * 10,
  });

  return res.status(200).send(users);
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({ where: { id: req.params.id } });
  if (!user) return next(new AppError("Not Found", 404));
  return res.status(200).send(user);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { email, password, firstName, lastName, sex } = req.body;
  const user = await Users.findOne({ where: { id: req.params.id } });
  if (!user) return next(new AppError("Not Found", 404));

  if (password) password = await bcrypt.hash(password, 12);
  await user.update({ email, password, firstName, lastName, sex });

  return res.status(200).send(user);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({ where: { id: req.params.id } });
  if (!user) return next(new AppError("Not Found", 404));

  if (user.image != null) fs.unlink(`./public/${user.image}.webp`, (err) => {});

  await user.destroy();
  return res.status(204).send();
});

exports.savePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("Please provide Image", 404));

  const user = await Users.findOne({ where: { id: req.params.id } });
  if (!user) return next(new AppError("Not Found", 404));
  if (user.image != null) fs.unlink(`./public/${user.image}.webp`, (err) => {});

  const fileName = v4();
  await sharp(req.file.buffer)
    .toFormat("webp")
    .webp({ quality: 90 })
    .toFile(`./public/${fileName}.webp`);
  await user.update({ image: fileName });

  return res.status(200).json({ msg: "Photo Uploaded Successfully" });
});

exports.deletePhoto = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({ where: { id: req.params.id } });
  if (!user) return next(new AppError("Not Found", 404));

  if (user.image != null) {
    fs.unlink(`./public/${user.image}.webp`, (err) => {});
    await user.update({ image: null });
  }

  return res.status(204).send();
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadPhoto = upload.single("photo");
