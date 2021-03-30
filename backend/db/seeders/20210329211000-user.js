'use strict';

const bcrypt = require('bcryptjs');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { username: 'Demo-User', email: 'demo@user.io', hashedPassword: bcrypt.hashSync('password') },
      { username: 'FakeUser1', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()) },
      { username: 'FakeUser2', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()) },
      { username: 'FakeUser3', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()) },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-User', 'FakeUser1', 'FakeUser2', 'FakeUser3']}
    }, {});
  }
};
