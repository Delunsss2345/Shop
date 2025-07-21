const AuthService = require("@/services/auth.service");
const jwtService = require("@/services/jwt.service");

class AuthController {
  getMe = async (req, res) => {
    res.success(200, "Kiểm tra user thành công", req.user);
  };

  register = async (req, res) => {
    const user = await AuthService.register(req.body, res);
    res.success(201, "Đăng ký thành công", user);
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    jwtService.setCookie(res, result.accessToken, result.refreshToken);
    res.success(200, "Đăng nhập thành công", result.userLogin);
  };

  logout = async (req, res) => {
    await AuthService.logout(req, res);
    res.success(200, "Đăng xuất thành công");
  };

  refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.error(401, "Không có token truy cập");

    const { accessToken, newRefreshToken } =
      await AuthService.refreshAccessToken(refreshToken);
    jwtService.setCookie(res, accessToken, newRefreshToken);
    res.success(200, "Tạo mới thành công");
  };
}

module.exports = new AuthController();
