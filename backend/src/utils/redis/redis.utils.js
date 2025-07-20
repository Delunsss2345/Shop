const redis = require("@/config/redis");

const saveRefreshToken = async (userId, refreshToken) => {
  const key = `refresh_token:${userId}`;
  const expiry = 30 * 24 * 60 * 60; 

  await redis.set(key, expiry, refreshToken);
};

const verifyRefreshToken = async (userId, refreshToken) => {
  const key = `refresh_token:${userId}`;
  const storedToken = await redis.get(key);

  return storedToken === refreshToken;
};

module.exports = { saveRefreshToken, verifyRefreshToken };
