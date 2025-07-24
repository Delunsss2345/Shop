"use strict";

module.exports = (sequelize, DataTypes) => {
  const CartDetail = sequelize.define(
    "CartDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "cart_details",
      timestamps: true,
    }
  );

  CartDetail.associate = (function (db) {
    CartDetail.belongsTo(db.Cart, {
      foreignKey: "cartId",
      as: "carts",
    });
    CartDetail.belongsTo(db.Product, {
      foreignKey: "productId",
      as: "products",
    });
  });

  return CartDetail;
};
