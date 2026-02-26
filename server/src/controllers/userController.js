const { User } = require("../models");

// GET /api/users
const getAll = async (_req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch users", error: error.message });
  }
};

// GET /api/users/:id
const getById = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch user", error: error.message });
  }
};

// POST /api/users
const create = async (req, res) => {
  try {
    const { user_id, user_name, user_password } = req.body;

    if (!user_id || !user_name || !user_password) {
      return res.status(400).json({ status: "error", message: "All fields required" });
    }

    const existing = await User.findOne({ where: { user_id } });
    if (existing) return res.status(409).json({ status: "error", message: "User already exists" });

    const user = await User.create({ user_id, user_name, user_password });
    res.status(201).json({ status: "success", message: "User created", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to create user", error: error.message });
  }
};

// PUT /api/users/:id
const update = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });

    const { user_name, user_password } = req.body;
    await user.update({ user_name, user_password });
    res.status(200).json({ status: "success", message: "User updated", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to update user", error: error.message });
  }
};

// DELETE /api/users/:id
const remove = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });

    await user.destroy();
    res.status(200).json({ status: "success", message: "User deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to delete user", error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };