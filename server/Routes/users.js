const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

// Route to get user by ID
router.get("/:userId", UserController.getUserById);

module.exports = router;
