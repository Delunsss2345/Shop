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
        field: "user_id",
      },
      shipName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "ship_name",
      },
      shipPhone: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: "ship_phone",
      },
      shipAddress: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "ship_address",
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "orders",
      timestamps: false,
    }
  );

  Order.associate = function (db) {
    Order.belongsTo(db.User, {
      foreignKey: "userId",
      as: "user",
    });
    Order.hasMany(db.OrderDetail, {
      foreignKey: "orderId",
      as: "orderDetails",
    });
  };

  return Order;
};
