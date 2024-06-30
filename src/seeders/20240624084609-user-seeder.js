'use strict';
const { hashPassword } = require('../utils/bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    return queryInterface.bulkInsert('users',[
      {
        name:'Chilling Loccini',
        email:'chillingloccini@gmail.com',
        password: hashPassword('password'),
        created_at: now,
        updated_at: now
      },
      {
        name:'John Doe',
        email:'johndoe@gmail.com',
        password: hashPassword('password'),
        created_at: now,
        updated_at: now
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('categories',{},null)
  }
};
