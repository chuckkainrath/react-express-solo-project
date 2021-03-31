'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = (await queryInterface.sequelize.query(
      'SELECT id FROM "Users"'
    ))[0];
    const groups = (await queryInterface.sequelize.query(
      'SELECT id FROM "Groups"'
    ))[0];
    return queryInterface.bulkInsert('UserGroups', [
      {userId: users[0].id, groupId: groups[0].id},
      {userId: users[1].id, groupId: groups[1].id},
      {userId: users[2].id, groupId: groups[2].id},
      {userId: users[0].id, groupId: groups[1].id},
      {userId: users[0].id, groupId: groups[2].id},
      {userId: users[1].id, groupId: groups[0].id},
      {userId: users[2].id, groupId: groups[0].id},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserGroups', null, {});
  }
};
