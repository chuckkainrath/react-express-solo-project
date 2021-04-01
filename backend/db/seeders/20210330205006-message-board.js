'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = (await queryInterface.sequelize.query(
      'SELECT id FROM "Users"'
    ))[0];
    const groups = (await queryInterface.sequelize.query(
      'SELECT id FROM "Groups"'
    ))[0];

    return queryInterface.bulkInsert('MessageBoards', [
      { groupId: groups[0].id, userId: users[0].id, title: faker.lorem.words(), message: faker.lorem.sentence()},
      { groupId: groups[0].id, userId: users[1].id, title: faker.lorem.words(), message: faker.lorem.sentence()},
      { groupId: groups[0].id, userId: users[2].id, title: faker.lorem.words(), message: faker.lorem.sentence()},
      { groupId: groups[0].id, userId: users[0].id, title: faker.lorem.words(), message: faker.lorem.sentence()},
      { groupId: groups[1].id, userId: users[0].id, title: faker.lorem.words(), message: faker.lorem.sentence()},
      { groupId: groups[1].id, userId: users[1].id, title: faker.lorem.words(), message: faker.lorem.sentence()},
      { groupId: groups[1].id, userId: users[1].id, title: faker.lorem.words(), message: faker.lorem.sentence()},
      { groupId: groups[2].id, userId: users[2].id, title: faker.lorem.words(), message: faker.lorem.sentence()},
      { groupId: groups[2].id, userId: users[1].id, title: faker.lorem.words(), message: faker.lorem.sentence()},
      { groupId: groups[2].id, userId: users[2].id, title: faker.lorem.words(), message: faker.lorem.sentence()},
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MessageBoards', null, {});
  }
};
