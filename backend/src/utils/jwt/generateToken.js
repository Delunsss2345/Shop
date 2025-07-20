const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = crypto.randomBytes(32).toString("hex");

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = { generateToken };
