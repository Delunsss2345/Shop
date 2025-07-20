const express = require("express");
const router = express.Router();
const { validationHandler } = require("@/middlewares/validationHandler");
const AuthController = require("@/controllers/auth.controller");
const { body } = require("express-validator");
const { verifyAccessToken } = require("@/utils/jwt/jwt");

//GET /api/auth/me
router.get("/me", verifyAccessToken, AuthController.getMe);

// POST /api/auth/register
router.post(
  "/register",
  [
    body("firstName")
      .notEmpty()
      .matches(/^[A-Z][a-z]*(\s+[A-Z][a-z]*)*$/)
      .withMessage("Chữ của họ buộc viết hoa"),
    body("lastName")
      .notEmpty()
      .matches(/^[A-Z][a-z]*(\s+[A-Z][a-z]*)*$/)
      .withMessage("Chữ cái đầu của tên buộc viết hoa"),
    body("email").isEmail().withMessage("Sai định dạng email"),
    body("phone")
      .matches(/^0\d{9}$/)
      .withMessage("Số phải đúng định dạng"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Mật khẩu phải trên 6 ký tự"),
    validationHandler,
  ],
  AuthController.register
);

// POST /api/auth/login
router.post("/login", AuthController.login);

// POST /api/auth/logout
router.post("/logout", AuthController.logout);

// POST /api/auth/refresh-token
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
