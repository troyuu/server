const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

// Import route files
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const infoUserRoutes = require("./infoUserRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");

// Public routes
router.use("/auth", authRoutes);

// Protected routes (require JWT token)
router.use("/users", authenticateToken, userRoutes);
router.use("/user-info", authenticateToken, infoUserRoutes);
router.use("/products", authenticateToken, productRoutes);
router.use("/orders", authenticateToken, orderRoutes);

module.exports = router;