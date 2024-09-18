const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup", upload.single("profileImage"), authController.signup);
router.post("/login", authController.login);

module.exports = router;
