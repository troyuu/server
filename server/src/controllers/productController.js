const { ProductInfo, ProductCategory } = require("../models");

// ==================== PRODUCTS ====================

// GET /api/products
const getAllProducts = async (_req, res) => {
  try {
    const products = await ProductInfo.findAll();
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch products", error: error.message });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await ProductInfo.findOne({ where: { product_id: req.params.id } });
    if (!product) return res.status(404).json({ status: "error", message: "Product not found" });
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch product", error: error.message });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const { product_id, product_info, product_price, product_description, product_category } = req.body;

    if (!product_id) {
      return res.status(400).json({ status: "error", message: "product_id is required" });
    }

    const existing = await ProductInfo.findOne({ where: { product_id } });
    if (existing) return res.status(409).json({ status: "error", message: "Product already exists" });

    const product = await ProductInfo.create({ product_id, product_info, product_price, product_description, product_category });
    res.status(201).json({ status: "success", message: "Product created", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to create product", error: error.message });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await ProductInfo.findOne({ where: { product_id: req.params.id } });
    if (!product) return res.status(404).json({ status: "error", message: "Product not found" });

    const { product_info, product_price, product_description, product_category } = req.body;
    await product.update({ product_info, product_price, product_description, product_category });
    res.status(200).json({ status: "success", message: "Product updated", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to update product", error: error.message });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await ProductInfo.findOne({ where: { product_id: req.params.id } });
    if (!product) return res.status(404).json({ status: "error", message: "Product not found" });

    await product.destroy();
    res.status(200).json({ status: "success", message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to delete product", error: error.message });
  }
};

// ==================== CATEGORIES ====================

// GET /api/products/categories/all
const getAllCategories = async (_req, res) => {
  try {
    const categories = await ProductCategory.findAll();
    res.status(200).json({ status: "success", data: categories });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch categories", error: error.message });
  }
};

// GET /api/products/categories/:id
const getCategoryById = async (req, res) => {
  try {
    const category = await ProductCategory.findOne({ where: { category_id: req.params.id } });
    if (!category) return res.status(404).json({ status: "error", message: "Category not found" });
    res.status(200).json({ status: "success", data: category });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch category", error: error.message });
  }
};

// POST /api/products/categories
const createCategory = async (req, res) => {
  try {
    const { category_id, category_name } = req.body;

    if (!category_id) {
      return res.status(400).json({ status: "error", message: "category_id is required" });
    }

    const existing = await ProductCategory.findOne({ where: { category_id } });
    if (existing) return res.status(409).json({ status: "error", message: "Category already exists" });

    const category = await ProductCategory.create({ category_id, category_name });
    res.status(201).json({ status: "success", message: "Category created", data: category });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to create category", error: error.message });
  }
};

// PUT /api/products/categories/:id
const updateCategory = async (req, res) => {
  try {
    const category = await ProductCategory.findOne({ where: { category_id: req.params.id } });
    if (!category) return res.status(404).json({ status: "error", message: "Category not found" });

    const { category_name } = req.body;
    await category.update({ category_name });
    res.status(200).json({ status: "success", message: "Category updated", data: category });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to update category", error: error.message });
  }
};

// DELETE /api/products/categories/:id
const deleteCategory = async (req, res) => {
  try {
    const category = await ProductCategory.findOne({ where: { category_id: req.params.id } });
    if (!category) return res.status(404).json({ status: "error", message: "Category not found" });

    await category.destroy();
    res.status(200).json({ status: "success", message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to delete category", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};