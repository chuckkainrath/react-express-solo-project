'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const todoGroups = (await queryInterface.sequelize.query(
      'SELECT id FROM "TodoGroups"'
    ))[0];
    return queryInterface.bulkInsert('TodoItems', [
      {todoGroupId: todoGroups[0].id, task: faker.lorem.words(), completed: false},
      {todoGroupId: todoGroups[0].id, task: faker.lorem.words(), completed: true},
      {todoGroupId: todoGroups[0].id, task: faker.lorem.words(), completed: false},
      {todoGroupId: todoGroups[0].id, task: faker.lorem.words(), completed: true},
      {todoGroupId: todoGroups[1].id, task: faker.lorem.words(), completed: true},
      {todoGroupId: todoGroups[1].id, task: faker.lorem.words(), completed: true},
      {todoGroupId: todoGroups[1].id, task: faker.lorem.words(), completed: true},
      {todoGroupId: todoGroups[1].id, task: faker.lorem.words(), completed: true},
      {todoGroupId: todoGroups[2].id, task: faker.lorem.words(), completed: true},
      {todoGroupId: todoGroups[2].id, task: faker.lorem.words(), completed: true},
      {todoGroupId: todoGroups[2].id, task: faker.lorem.words(), completed: false},
      {todoGroupId: todoGroups[2].id, task: faker.lorem.words(), completed: false},
      {todoGroupId: todoGroups[3].id, task: faker.lorem.words(), completed: true},
      {todoGroupId: todoGroups[3].id, task: faker.lorem.words(), completed: false},
      {todoGroupId: todoGroups[3].id, task: faker.lorem.words(), completed: false},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TodoItems', null, {});
  }
};
