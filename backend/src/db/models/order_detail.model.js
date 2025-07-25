"use strict";

module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define(
    "OrderDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "order_id",
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "product_id",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "order_details",
      timestamps: false,
    }
  );

  OrderDetail.associate = function (db) {
    OrderDetail.belongsTo(db.Order, {
      foreignKey: "orderId",
      as: "order",
    });

    OrderDetail.belongsTo(db.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return OrderDetail;
};
