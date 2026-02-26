const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RegisterUser, LoginUser, InfoUser } = require("../models");

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { user_id, user_name, user_password, f_name, l_name, age } = req.body;

    if (!user_id || !user_name || !user_password) {
      return res.status(400).json({
        status: "error",
        message: "Required fields: user_id, user_name, user_password",
      });
    }

    const existing = await RegisterUser.findOne({ where: { user_id } });
    if (existing) {
      return res.status(409).json({
        status: "error",
        message: "User already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);

    const newUser = await RegisterUser.create({
      user_id,
      user_name,
      user_password: hashedPassword,
      f_name,
      l_name,
      age,
    });

    await InfoUser.create({
      user_id,
      f_name,
      l_name,
      age,
      user_address: null,
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        id: newUser.id,
        user_id: newUser.user_id,
        user_name: newUser.user_name,
        f_name: newUser.f_name,
        l_name: newUser.l_name,
        age: newUser.age,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Registration failed",
      error: error.message,
    });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { user_name, user_password } = req.body;

    if (!user_name || !user_password) {
      return res.status(400).json({
        status: "error",
        message: "Required fields: user_name, user_password",
      });
    }

    const user = await RegisterUser.findOne({ where: { user_name } });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid username or password",
      });
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      { id: user.id, user_id: user.user_id, user_name: user.user_name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    await LoginUser.create({
      user_id: user.user_id.toString(),
      user_name: user.user_name,
      user_password: user.user_password,
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      data: {
        id: user.id,
        user_id: user.user_id,
        user_name: user.user_name,
        f_name: user.f_name,
        l_name: user.l_name,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Login failed",
      error: error.message,
    });
  }
};

// GET /api/auth/profile
const getProfile = async (req, res) => {
  try {
    const user = await RegisterUser.findOne({
      where: { user_id: req.user.user_id },
      attributes: ["id", "user_id", "user_name", "f_name", "l_name", "age"],
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

// GET /api/auth/registered
const getAllRegistered = async (_req, res) => {
  try {
    const users = await RegisterUser.findAll({
      attributes: ["id", "user_id", "user_name", "f_name", "l_name", "age"],
    });
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// GET /api/auth/login-history
const getLoginHistory = async (_req, res) => {
  try {
    const history = await LoginUser.findAll();
    res.status(200).json({ status: "success", data: history });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch login history",
      error: error.message,
    });
  }
};

module.exports = { register, login, getProfile, getAllRegistered, getLoginHistory };