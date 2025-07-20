const ApiError = require("@/utils/error/ApiError");
const db = require("@/db/models/index");
const jwt = require("jsonwebtoken");
const verifyAccessToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new ApiError(401, "Chưa có token");
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  if (!decoded) {
    throw new ApiError(401, "Token không hợp lệ");
  }

  const user = await db.User.findOne({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new ApiError(401, "Không có quyền truy cập");
  }

  req.user = user;
  next();
};

module.exports = { verifyAccessToken };
