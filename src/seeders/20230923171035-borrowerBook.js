'use strict';
const faker = require('faker');
const { Borrower, Book } = require('../models');
const book = require('../models/book');

const borrowBooksData = [];
const numberOfBorrowedBooks = 20; // Change this to the number of fake borrowed books you want to generate

let bookUUIDs = [];
let borrowerUUIDs = [];
(async () => {
  bookUUIDs = await Book.findAll().then((books) => books.map((book) => book.uuid));
  borrowerUUIDs = await Borrower.findAll().then((borrowers) => borrowers.map((borrower) => borrower.uuid));
})();

for (let i = 0; i < numberOfBorrowedBooks; i++) {
	borrowBooksData.push({
		bookId: faker.random.arrayElement(bookUUIDs),
		borrowerId: faker.random.arrayElement(borrowerUUIDs),
		borrowedDate: faker.date.past(),
		dueDate: faker.date.future(),
		returnDate: faker.datatype.boolean() ? null : faker.date.past(),
		createdAt: new Date(),
		updatedAt: new Date(),
	});
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
