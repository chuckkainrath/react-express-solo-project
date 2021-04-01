'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const groups = (await queryInterface.sequelize.query(
      'SELECT id FROM "Groups"'
    ))[0];
    return queryInterface.bulkInsert('TodoGroups', [
      {groupId: groups[0].id, title: faker.lorem.word(), completed: false},
      {groupId: groups[0].id, title: faker.lorem.words(), completed: true},
      {groupId: groups[0].id, title: faker.lorem.words(), completed: false},
      {groupId: groups[0].id, title: faker.lorem.word(), completed: false},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TodoGroups', null, {});
  }
};
