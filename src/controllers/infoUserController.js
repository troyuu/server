const { InfoUser } = require("../models");

// GET /api/user-info
const getAll = async (_req, res) => {
  try {
    const users = await InfoUser.findAll();
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch user info", error: error.message });
  }
};

// GET /api/user-info/:id
const getById = async (req, res) => {
  try {
    const info = await InfoUser.findOne({ where: { user_id: req.params.id } });
    if (!info) return res.status(404).json({ status: "error", message: "User info not found" });
    res.status(200).json({ status: "success", data: info });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch user info", error: error.message });
  }
};

// PUT /api/user-info/:id
const update = async (req, res) => {
  try {
    const info = await InfoUser.findOne({ where: { user_id: req.params.id } });
    if (!info) return res.status(404).json({ status: "error", message: "User info not found" });

    const { f_name, l_name, age, user_address } = req.body;
    await info.update({ f_name, l_name, age, user_address });
    res.status(200).json({ status: "success", message: "User info updated", data: info });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to update user info", error: error.message });
  }
};

// DELETE /api/user-info/:id
const remove = async (req, res) => {
  try {
    const info = await InfoUser.findOne({ where: { user_id: req.params.id } });
    if (!info) return res.status(404).json({ status: "error", message: "User info not found" });

    await info.destroy();
    res.status(200).json({ status: "success", message: "User info deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to delete user info", error: error.message });
  }
};

module.exports = { getAll, getById, update, remove };