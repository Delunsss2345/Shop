"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "last_name",
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "role_id",
        defaultValue: 2,
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        filed: "is_active",
      },
    },
    {
      tableName: "users",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["password", "role_id"] },
      },
    }
  );
  User.associate = (db) => {
    User.belongsTo(db.Role, {
      foreignKey: "roleId",
      as: "role",
    });
  };

  User.associate = (db) => {
    User.hasMany(db.RefreshToken, {
      foreignKey: "userId",
      as: "refreshTokens",
    });
  };
  return User;
};
