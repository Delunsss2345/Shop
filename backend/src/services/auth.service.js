const ApiError = require("@/utils/error/ApiError");
const bcrypt = require("bcrypt");
const db = require("@/db/models/index");
const Cloudinary = require("@/services/cloudinary.service");
const { where } = require("sequelize");
const { setCookie } = require("@/services/jwt.service");
const { generateToken } = require("@/utils/jwt/generateToken");
class AuthService {
  register = async (data, res) => {
    const exists = await db.User.findOne({
      where: { email: data.email },
    });

    if (exists) throw new ApiError(409, "Email đã được sử dụng");

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await db.User.create({
      ...data,
      password: hashPassword,
    });

    const newUser = await db.User.findByPk(user.id, {
      include: {
        model: db.Role,
        as: "role",
      },
    });

    if (newUser) {
      const { accessToken, refreshToken } = generateToken({ userId: user.id });
      setCookie(res, accessToken, refreshToken);
    } else {
      throw new ApiError(409, "Đăng ký thất bại vui lòng thử lại sau");
    }

    return newUser;
  };

  login = async (email, password) => {};

  logout = async (res) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  };

  refreshToken = async (token) => {};
}

module.exports = new AuthService();
