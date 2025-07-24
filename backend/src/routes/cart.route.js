const express = require("express");
const { body, query, param } = require("express-validator");
const CartController = require("@/controllers/cart.controller");
const { validationHandler } = require("@/middlewares/validationHandler");
const { checkAuth } = require("@/middlewares/checkAuth");
const { getCart, addItem, updateItem, removeItem } = CartController;
const router = express.Router();

router.use(checkAuth);
router.get("/", getCart);
router.post("/add", addItem);
router.patch("/:id", updateItem);
router.delete("/:id", removeItem);

module.exports = router;
