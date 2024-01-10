const express = require("express");
const auth = require("../controllers/auth");
const user = require("../controllers/userControllers");
const router = express.Router();

router.use(auth.protect);

router.get("/", user.getAllUsers);
router.get("/:id", user.getUser);
router.put("/:id", user.updateUser);
router.delete("/:id", user.deleteUser);

router.put("/image/:id", user.uploadPhoto, user.savePhoto);
router.delete("/image/:id", user.deletePhoto);

module.exports = router;
