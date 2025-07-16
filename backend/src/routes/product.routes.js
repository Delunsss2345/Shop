const express = require("express");
const { body, query } = require("express-validator");
const ProductController = require("@/controllers/product.controller");
const { validationHandler } = require("@/middlewares/validationHandler");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  blockProduct,
} = ProductController;

// GET /api/products - Lấy tất cả sản phẩm
router.get("/", getAllProducts);

// POST /api/product - Tạo sản phẩm mới
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Tên sản phẩm không được để trống"),
    body("price").isNumeric().withMessage("Giá sản phẩm phải là số"),
    body("description")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Mô tả không được quá 1000 ký tự"),
    validationHandler,
  ],
  createProduct
);

// GET /api/product/:id - Lấy sản phẩm theo ID
router.get(
  "/:id",
  query("id").isNumeric().withMessage("Lỗi id"),
  validationHandler,
  getProductById
);

// PUT /api/product/:id - Cập nhật sản phẩm
router.put("/:id", updateProduct);

// DELETE /api/product/:id - Xóa sản phẩm
router.delete("/:id", deleteProduct);

// PATCH /api/product/block/:id - Block sản phẩm
router.patch("/block/:id", blockProduct);

module.exports = router;
