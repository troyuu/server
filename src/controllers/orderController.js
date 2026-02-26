const { OrderCheckout } = require("../models");

// GET /api/orders
const getAll = async (_req, res) => {
  try {
    const orders = await OrderCheckout.findAll();
    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch orders", error: error.message });
  }
};

// GET /api/orders/:id
const getById = async (req, res) => {
  try {
    const order = await OrderCheckout.findByPk(req.params.id);
    if (!order) return res.status(404).json({ status: "error", message: "Order not found" });
    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch order", error: error.message });
  }
};

// GET /api/orders/user/:userId
const getByUserId = async (req, res) => {
  try {
    const orders = await OrderCheckout.findAll({ where: { user_id: req.params.userId } });
    if (orders.length === 0) {
      return res.status(404).json({ status: "error", message: "No orders found for this user" });
    }
    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch orders", error: error.message });
  }
};

// POST /api/orders
const create = async (req, res) => {
  try {
    const { user_id, product_id, order_userid, product_info, product_price, mode_payment, total, quantity, user_address } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({ status: "error", message: "Required: user_id, product_id" });
    }

    const order = await OrderCheckout.create({
      user_id,
      product_id,
      order_userid,
      product_info,
      product_price,
      mode_payment,
      total,
      quantity,
      user_address,
    });

    res.status(201).json({ status: "success", message: "Order created", data: order });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to create order", error: error.message });
  }
};

// PUT /api/orders/:id
const update = async (req, res) => {
  try {
    const order = await OrderCheckout.findByPk(req.params.id);
    if (!order) return res.status(404).json({ status: "error", message: "Order not found" });

    const { user_id, product_id, order_userid, product_info, product_price, mode_payment, total, quantity, user_address } = req.body;
    await order.update({ user_id, product_id, order_userid, product_info, product_price, mode_payment, total, quantity, user_address });
    res.status(200).json({ status: "success", message: "Order updated", data: order });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to update order", error: error.message });
  }
};

// DELETE /api/orders/:id
const remove = async (req, res) => {
  try {
    const order = await OrderCheckout.findByPk(req.params.id);
    if (!order) return res.status(404).json({ status: "error", message: "Order not found" });

    await order.destroy();
    res.status(200).json({ status: "success", message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to delete order", error: error.message });
  }
};

module.exports = { getAll, getById, getByUserId, create, update, remove };