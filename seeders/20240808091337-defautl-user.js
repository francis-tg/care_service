'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@careservice.com',
        password: await bcrypt.hash('adminpassword', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const roles = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name = 'Admin';`
    );

    const adminRoleId = roles[0][0].id;

    await queryInterface.bulkInsert('UserRoles', [
      {
        userId: 1,
        roleId: adminRoleId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserRoles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
