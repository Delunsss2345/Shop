// src/db/seeders/20250711023216-users-seeder.js
'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        first_name: 'Phạm',          
        last_name: 'Thanh Huy',
        email: 'admin@admin.com',
        phone: '+84 999 888 777',
        role_id: 1,         
        avatar: '',
        password: await bcrypt.hash('admin123', 10),
        is_active: true
      }
    ];

    await queryInterface.bulkInsert('users', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'admin@admin.com'
    }, {});
  }
};