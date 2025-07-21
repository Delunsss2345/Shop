const ApiError = require("@/utils/error/ApiError");
const bcrypt = require("bcrypt");
const db = require("@/db/models/index");
const jwtService = require("@/services/jwt.service");
const refreshTokenService = require("@/services/refreshToken.service");
const { where } = require("sequelize");
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
      const accessToken = jwtService.generateAccessToken(newUser.id);
      const refreshToken = await refreshTokenService.createRefreshToken(
        newUser.id
      );

      setCookie(res, accessToken, refreshToken.refreshToken);
    } else {
      throw new ApiError(409, "Đăng ký thất bại vui lòng thử lại sau");
    }

    return newUser;
  };

  login = async (email, password) => {
    const user = await db.User.scope(null).findOne({
      where: { email },
    });
    console.log(user.id, password);
    if (!user) throw new ApiError(404, "Không tồn tại user");

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new ApiError(400, "Sai tài khoản hoặc mật khẩu");
    }
    const accessToken = jwtService.generateAccessToken(user.id);
    const refreshToken = await refreshTokenService.createRefreshToken(user.id);

    const userLogin = await db.User.findOne({
      where: { email },
    });

    return {
      userLogin,
      accessToken,
      refreshToken: refreshToken.refreshToken,
    };
  };

  /**
   *
   *
   * @param {Response} res
   * @memberof AuthService
   */

  logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    const refreshToken = await refreshTokenService.findValidRefreshToken(token);
    await refreshTokenService.deleteRefreshToken(refreshToken);

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

  refreshAccessToken = async (token) => {
    const refreshToken = await refreshTokenService.findValidRefreshToken(token);
    if (!refreshToken) {
      throw new ApiError(401, "Token không hợp lệ");
    }

    const accessToken = await jwtService.generateAccessToken(
      refreshToken.userId
    );

    await refreshTokenService.deleteRefreshToken(refreshToken);

    const newRefreshToken = await refreshTokenService.createRefreshToken(
      refreshToken.userId
    );

    
    return {
      accessToken,
      newRefreshToken: newRefreshToken.refreshToken,
    };
  };
}

module.exports = new AuthService();
