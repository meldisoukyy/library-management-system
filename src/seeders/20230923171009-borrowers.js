'use strict';
const borrowersData = require('./data/borrowers')(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Borrowers', borrowersData, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('People', null, {});
	},
};
