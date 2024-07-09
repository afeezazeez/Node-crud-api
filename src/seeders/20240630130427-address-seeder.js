'use strict';

const { User } = require('../models');
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Get all users from the database
      const users = await getUsers();

      // Generate dummy addresses for each user
      const addresses = generateDummyAddresses(users);

      // Insert generated addresses into the database
      await queryInterface.bulkInsert('addresses', addresses, {});
    } catch (error) {
      console.error('Error in seeder up function:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Delete all addresses to revert seed
      await queryInterface.bulkDelete('addresses', null, {});
    } catch (error) {
      console.error('Error in seeder down function:', error);
    }
  }
};

// Helper functions

async function getUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

function generateDummyAddresses(users) {
    
  const addresses = users.map(user => {
    const streetNumber = faker.location.buildingNumber();
    const street = faker.location.street();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipCode = faker.location.zipCode();
    
    return {
      name: `${streetNumber} ${street}, ${city}, ${state} ${zipCode}`,
      user_id: user.id,
      created_at: new Date(),
      updated_at: new Date()
    };
  });
  return addresses;
}