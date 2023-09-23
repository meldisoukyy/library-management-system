'use strict';
const faker = require('faker');

const borrowersData = [];
const numberOfBorrowers = 5; // Change this to the number of fake borrowers you want to generate

for (let i = 0; i < numberOfBorrowers; i++) {
	borrowersData.push({
    uuid: faker.datatype.uuid(),
		name: faker.name.findName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		registeredDate: faker.date.past(),
		updatedAt: new Date(),
	});
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Borrowers', borrowersData, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('People', null, {});
	},
};
