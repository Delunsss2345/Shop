const generateToken = require("@/utils/jwt/generateToken");
const db = require("@/db/models/index");
const { Op } = require("sequelize");
const { refreshToken } = require("../controllers/auth.controller");
const JWT_EXPIRE = 15 * 24 * 60 * 60;

const generateUnique = async () => {
  let token = null;
  do {
    token = generateToken();
  } while (
    await db.RefreshToken.findOne({
      where: { refreshToken: token },
    })
  );

  return token;
};

const createRefreshToken = async (userId) => {
  const refreshToken = await generateUnique();
  const expireAt = new Date(Date.now() + JWT_EXPIRE * 1000);

  const created = await db.RefreshToken.create({
    userId,
    refreshToken,
    expireAt,
  });

  return created;
};

const findValidRefreshToken = async (token) => {
  return await db.RefreshToken.findOne({
    where: {
      refreshToken: token,
      expire_at: {
        [Op.gte]: Date.now(),
      },
    },
  });
};

const deleteRefreshToken = async (refreshToken) => {
  await refreshToken.destroy();
};

module.exports = {
  createRefreshToken,
  findValidRefreshToken,
  deleteRefreshToken,
};
