const AuthService = require("@/services/auth.service");
class AuthController {
  getMe = async (req, res) => {
    res.success(200, "Kiểm tra user thành công", req.user);
  };
  register = async (req, res) => {
    const user = await AuthService.register(req.body, res);
    res.success(201, "Đăng ký thành công", user);
  };

  login = async (email, password) => {};

  logout = async (req, res) => {
    await AuthService.logout(res);
    res.success(200, "Đăng xuất thành công");
  };

  refreshToken = async (token) => {};
}

module.exports = new AuthController();
