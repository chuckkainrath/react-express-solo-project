'use strict';

const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { username: 'Demo-User', email: 'demo@user.io', hashedPassword: bcrypt.hashSync('password') },
      { username: 'FakeUser1', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()) },
      { username: 'FakeUser2', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()) },
      { username: 'FakeUser3', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()) },
    ], {});

    // let firstGroupId = await queryInterface.bulkInsert('Groups', [
    //   { name: 'FakeGroup1', ownerId: firstUserId + 1},
    //   { name: 'FakeGroup2', ownerId: firstUserId + 2},
    // ], {});
    // firstGroupId = Array.isArray(firstGroupId) ? firstGroupId[0] : firstGroupId;
    // await queryInterface.bulkInsert('UserGroups', [
    //   { userId: firstUserId, groupId: firstGroupId },
    //   { userId: firstUserId + 1, groupId: firstGroupId },
    //   { userId: firstUserId + 2, groupId: firstGroupId },
    //   { userId: firstUserId, groupId: firstGroupId + 1},
    //   { userId: firstUserId + 2, groupId: firstGroupId + 2},
    //   { userId: firstUserId + 3, groupId: firstGroupId + 3},
    // ], {});
    // let firstMessageId = await queryInterface.bulkInsert('MessageBoards', [
    //   { groupId: firstGroupId, userId: firstUserId, message: 'How is everyone doing?'},
    //   { groupId: firstGroupId, userId: firstUserId + 1, message: 'I need help with a problem'},
    //   { groupId: firstGroupId + 1, userId: firstUserId + 2, message: 'When is a good time for the meeting?'},
    // ], {});
    // firstMessageId = Array.isArray(firstMessageId) ? firstMessageId[0] : firstMessageId;
    // await queryInterface.bulkInsert('MessageReplies', [
    //   { messageBoardId: firstMessageId, userId: firstUserId + 1, reply: 'Not too bad.'},
    //   { messageBoardId: firstMessageId, userId: firstUserId + 2, reply: 'Pretty good, almost done with the project'},
    //   { messageBoardId: firstMessageId + 1, userId: firstUserId + 2, reply: 'What is going on?'},
    //   { messageBoardId: firstMessageId + 2, userId: firstUserId, reply: 'Anytime this afternoon works.'},
    // ], {});
    // let firstTodoId = await queryInterface.bulkInsert('TodoGroups', [
    //   { groupId: firstGroupId, title: 'Database', completed: true},
    //   { groupId: firstGroupId, title: 'Front End', completed: false},
    //   { groupId: firstGroupId + 1, title: 'Company Party', completed: false},
    // ], {});
    // firstTodoId = Array.isArray(firstTodoId) ? firstTodoId[0] : firstTodoId;
    // return await queryInterface.bulkInsert('TodoItems', [
    //   { todoGroupId: firstTodoId, task: 'Create the DB Schema', completed: true },
    //   { todoGroupId: firstTodoId, task: 'Seed the DB', completed: true },
    //   { todoGroupId: firstTodoId + 1, task: 'Login page', completed: false },
    //   { todoGroupId: firstTodoId + 1, task: 'Home page', completed: false },
    //   { todoGroupId: firstTodoId + 2, task: 'Find caterer', completed: false },
    //   { todoGroupId: firstTodoId + 2, task: 'Find location', completed: false },
    // ], {});
    // await queryInterface.bulkInsert('Schedules', [
    //   { groupId: firstGroupId, date: new Date(), title: },
    //   { groupId: firstGroupId, date: , title: },
    //   { groupId: firstGroupId + 1, date: , title: },
    //   { groupId: firstGroupId + 1, date: , title: },
    // ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    // queryInterface.bulkDelete('TodoItems', {
    //   task: { [Op.in]: ['Create the DB Schema', 'Seed the DB', 'Login page', 'Home page', 'Find caterer', 'Find location']}
    // }, {});
    // queryInterface.bulkDelete('TodoGroups', {
    //   title: { [Op.in]: ['Database', 'Front End', 'Company Party']}
    // }, {});
    // queryInterface.bulkDelete('MessageReplies', {
    //   reply: { [Op.in]: ['Not too bad.', 'Pretty good, almost done with the project', 'What is going on?', 'Anytime this afternoon works.']}
    // }, {});
    // queryInterface.bulkDelete('MessageBoards', {
    //   message: { [Op.in]: ['How is everyone doing?', 'I need help with a problem', 'When is a good time for the meeting?']}
    // }, {});
    // // Add one for schedule
    // queryInterface.bulkDelete('UserGroups', null, {});
    // queryInterface.bulkDelete('Groups', {
    //   name: { [Op.in]: ['FakeGroup1', 'FakeGroup2']}
    // }, {});
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-User', 'FakeUser1', 'FakeUser2', 'FakeUser3']}
    }, {});
  }
};
