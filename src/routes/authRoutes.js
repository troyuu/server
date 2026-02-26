const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const authController = require("../controllers/authController");

// Public
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected
router.get("/profile", authenticateToken, authController.getProfile);
router.get("/registered", authenticateToken, authController.getAllRegistered);
router.get("/login-history", authenticateToken, authController.getLoginHistory);

module.exports = router;