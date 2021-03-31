'use strict';

const bcrypt = require('bcryptjs');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { username: 'Demo-User', email: 'demo@user.io', hashedPassword: bcrypt.hashSync('password') },
      { username: faker.name.findName(), email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()) },
      { username: faker.name.findName(), email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()) },
      { username: faker.name.findName(), email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()) },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
