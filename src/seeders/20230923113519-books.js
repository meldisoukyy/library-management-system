'use strict';
const booksData = require('./data/books')(10);

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
