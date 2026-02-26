const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Category routes (must be before /:id to avoid conflicts)
router.get("/categories/all", productController.getAllCategories);
router.get("/categories/:id", productController.getCategoryById);
router.post("/categories", productController.createCategory);
router.put("/categories/:id", productController.updateCategory);
router.delete("/categories/:id", productController.deleteCategory);

// Product routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;