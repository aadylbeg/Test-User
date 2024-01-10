const express = require("express");
const auth = require("../controllers/auth");
const router = express.Router();

router.post("/register", auth.signUp);
router.post("/login", auth.login);

module.exports = router;
