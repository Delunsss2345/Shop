"use strict";

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "categories",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      categoryName: {
        type: DataTypes.String(255),
        allowNull: false,
        filed: "category_name",
      },
    },
    {
      tableName: "categories",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["password", "role_id"] },
      },
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
