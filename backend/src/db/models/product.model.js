"use strict";

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: null,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      detailDesc: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "detail_desc",
      },
      shortDesc: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "short_desc",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      sold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      factory: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "category_id",
      },
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );

  Product.associate = function (db) {
    Product.belongsTo(db.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
    Product.hasMany(db.CartDetail, {
      foreignKey: "productId",
      as: "cartDetails",
    });
    Product.hasMany(db.OrderDetail, {
      foreignKey: "productId",
      as: "orderDetails",
    });
  };

  return Product;
};
