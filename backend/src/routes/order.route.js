const express = require("express");
const OrderController = require("@/controllers/order.controller");
const { createOrder } = OrderController;
const { checkAuth } = require("@/middlewares/checkAuth");

const router = express.Router();

router.use(checkAuth);
router.post("/checkout", createOrder);

module.exports = router;
