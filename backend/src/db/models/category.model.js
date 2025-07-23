"use strict";

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      categoryName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "categories",
      timestamps: true,
    }
  );

  Category.associate = function (db) {
    Category.hasMany(db.Product, {
      foreignKey: "categoryId",
      as: "products",
    });
  };

  return Category;
};
