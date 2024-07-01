'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    return queryInterface.bulkInsert('categories', [
      {
        name: 'Football',
        created_at: now,
        updated_at: now
      },
      {
        name: 'Hollywood',
        created_at: now,
        updated_at: now
      },
      {
        name: 'Cricket',
        created_at: now,
        updated_at: now
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories',{}, null);
  }
};
