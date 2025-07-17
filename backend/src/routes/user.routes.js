const express = require("express");
const { body, query, param } = require("express-validator");
const router = express.Router();
const {
  getAll,
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("@/controllers/user.controller");
const { validationHandler } = require("@/middlewares/validationHandler");

// GET /api/users/all - Lấy nhưng không phân trang
router.get("/all", getAll);

// GET /api/users - Lấy tất cả users phân trang
router.get("/", getAllUser);

// POST /api/users - Tạo user mới
router.post(
  "/",
  [
    body("firstName")
      .matches(/^[A-Z][a-z]*(\s+[A-Z][a-z]*)*$/)
      .withMessage("Chữ của họ buộc viết hoa"),
    body("lastName")
      .matches(/^[A-Z][a-z]*(\s+[A-Z][a-z]*)*$/)
      .withMessage("Chữ cái đầu của tên buộc viết hoa"),
    body("email").isEmail().withMessage("Sai định dạng email"),
    body("phone")
      .matches(/^0\d{9}$/)
      .withMessage("Số phải đúng định dạng"),
    validationHandler,
  ],
  createUser
);

// GET /api/users/:id - Lấy user theo ID
router.get(
  "/:id",
  param("id").isNumeric().withMessage("Lỗi id"),
  validationHandler,
  getUserById
);

// PATCH /api/users/:id - Xóa user
router.patch("/block/:id", deleteUser);

// PATCH /api/users/:id - Cập nhật user
router.patch("/:id", updateUser);

module.exports = router;
