'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = (await queryInterface.sequelize.query(
      'SELECT id FROM "Users"'
    ))[0];
    const messages = (await queryInterface.sequelize.query(
      'SELECT id FROM "MessageBoards"'
    ))[0];

    return queryInterface.bulkInsert('MessageReplies', [
      {userId: users[0].id, messageBoardId: messages[0].id, reply: faker.lorem.sentence()},
      {userId: users[1].id, messageBoardId: messages[0].id, reply: faker.lorem.paragraph()},
      {userId: users[2].id, messageBoardId: messages[1].id, reply: faker.lorem.paragraph()},
      {userId: users[0].id, messageBoardId: messages[1].id, reply: faker.lorem.sentence()},
      {userId: users[1].id, messageBoardId: messages[1].id, reply: faker.lorem.sentence()},
      {userId: users[2].id, messageBoardId: messages[1].id, reply: faker.lorem.paragraph()},
      {userId: users[2].id, messageBoardId: messages[2].id, reply: faker.lorem.sentence()},
      {userId: users[1].id, messageBoardId: messages[2].id, reply: faker.lorem.paragraph()},
      {userId: users[2].id, messageBoardId: messages[2].id, reply: faker.lorem.sentence()},
      {userId: users[1].id, messageBoardId: messages[3].id, reply: faker.lorem.sentence()},
      {userId: users[0].id, messageBoardId: messages[3].id, reply: faker.lorem.paragraph()},
      {userId: users[2].id, messageBoardId: messages[3].id, reply: faker.lorem.sentence()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
