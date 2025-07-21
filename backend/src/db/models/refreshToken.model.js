"use strict";

module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      expireAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "refreshTokens",
      timestamps: true,
    }
  );

  RefreshToken.associate = function (db) {
    RefreshToken.belongsTo(db.User, {
      foreignKey: "userId",
      as: "users",
    });
  };
  return RefreshToken;
};
