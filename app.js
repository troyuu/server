const express = require("express");
require("dotenv").config();

const sequelize = require("./src/config/database");
const routes = require("./src/routes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Health check
app.get("/", (_req, res) => {
  res.json({
    status: "success",
    message: "E-Commerce API is running",
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();