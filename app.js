const express = require("express");
const AppError = require("./utils/appError");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(require("morgan")("dev"));

app.use("/user", require("./routers/authRoutes"));
app.use("/profile", require("./routers/userRoutes"));

fs.access("./public", fs.constants.F_OK, (err) => {
  if (err) fs.mkdirSync("./public");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(require("./controllers/errController"));

module.exports = app;
