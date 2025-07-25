"use strict";

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
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
      shipName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      shipPhone: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      shipAddress: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "orders",
    }
  );

  Order.associate = function (db) {
    Order.belongsTo(db.User, {
      foreignKey: "userId",
      as: "user",
    });
    Order.belongsTo(db.OrderDetail, {
      foreignKey: "orderId",
      as: "orderDetails",
    });
  };

  return Order;
};
