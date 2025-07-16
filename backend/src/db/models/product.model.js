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
        field: "sort_desc",
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
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );

  Product.associate = function (db) {
    Product.belongsTo(db.Category, {
      foreignKey: "categoryId",
      as: "categories",
    });
  };

  return Product;
};
