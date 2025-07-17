const express = require("express");
const { body, query, param } = require("express-validator");
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
  getFeatureProduct,
} = ProductController;

// GET /api/products - Lấy tất cả sản phẩm
router.get("/", getAllProducts);

// POST /api/product - Tạo sản phẩm mới
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Tên sản phẩm không được để trống"),
    body("price").isFloat().withMessage("Giá sản phẩm phải là số").toFloat(),
    body("description")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Mô tả không được quá 1000 ký tự"),
    body("quantity")
      .isInt()
      .withMessage("Số lượng sản phẩm phải là số")
      .toInt(),
    body("sold").isInt().withMessage("Số lượng bán phải là số").toInt(),
    body("categoryId").isInt().withMessage("Danh mục phải hợp lệ").toInt(),
    validationHandler,
  ],
  createProduct
);
// GET /api/product/feature - Lấy sản phẩm nổi bật
router.get("/feature", getFeatureProduct);

// GET /api/product/:id - Lấy sản phẩm theo ID
router.get(
  "/:id",
  param("id").isNumeric().withMessage("Lỗi id"),
  validationHandler,
  getProductById
);

// PATCH /api/product/:id - Cập nhật sản phẩm
router.patch("/:id", updateProduct);

// DELETE /api/product/:id - Xóa sản phẩm
router.delete("/:id", deleteProduct);

module.exports = router;
