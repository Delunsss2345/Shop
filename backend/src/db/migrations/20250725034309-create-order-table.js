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
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      ship_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ship_phone: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      ship_address: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
