'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      {
        code: 'admin',
        description: 'Quản trị hệ thống'
      },
      {
        code: 'user',
        description: 'Người dùng'
      }
    ];

    await queryInterface.bulkInsert('roles', roles, { logging: console.log });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, { logging: console.log });
  }
};
