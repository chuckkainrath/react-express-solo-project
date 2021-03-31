'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = (await queryInterface.sequelize.query(
      'SELECT id FROM "Users"'
    ))[0];
    return queryInterface.bulkInsert('Groups', [
      {ownerId: users[0].id, name: faker.company.companyName()},
      {ownerId: users[1].id, name: faker.company.companyName()},
      {ownerId: users[2].id, name: faker.company.companyName()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
