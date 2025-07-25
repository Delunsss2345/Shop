"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
      },
      shipName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: "ship_name",
      },
      shipPhone: {
        type: Sequelize.STRING(10),
        allowNull: false,
        field: "ship_phone",
      },
      shipAddress: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: "ship_address",
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
