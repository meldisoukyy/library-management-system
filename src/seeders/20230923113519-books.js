'use strict';
const faker = require('faker');

const booksData = [];
const numberOfBooks = 50;

for (let i = 0; i < numberOfBooks; i++) {
  booksData.push({
    uuid: faker.datatype.uuid(),
    title: faker.lorem.words(),
    author: faker.name.findName(),
    isbn: faker.datatype.uuid(),
    quantity: faker.datatype.number({ min: 1, max: 100 }),
    shelfLocation: faker.random.word(),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', booksData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
    await queryInterface.bulkDelete('Books', null, {});
  }
};
