const express = require("express");
const { body, query, param } = require("express-validator");
const ProductController = require("@/controllers/product.controller");
const { validationHandler } = require("@/middlewares/validationHandler");
const router = express.Router();

module.exports = router;
