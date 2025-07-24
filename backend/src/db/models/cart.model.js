"use strict";

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "carts",
      timestamps: true,
    }
  );

  Cart.associate = function (db) {
    Cart.belongsTo(db.User, {
      foreignKey: "userId",
      as: "users",
    });

    Cart.hasMany(db.CartDetail, {
      foreignKey: "cartId",
      as: "cartDetails",
    });
  };

  return Cart;
};
