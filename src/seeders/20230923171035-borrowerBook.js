'use strict';
const faker = require('faker');
const { Borrower, Book } = require('../models');
const book = require('../models/book');

const borrowBooksData = [];
const numberOfBorrowedBooks = 20; // Change this to the number of fake borrowed books you want to generate

let bookIDs = [];
let borrowerIDs = [];
(async () => {
  bookIDs = await Book.findAll().then((books) => books.map((book) => book.id));
  borrowerDs = await Borrower.findAll().then((borrowers) => borrowers.map((borrower) => borrower.id));
})();

for (let i = 0; i < numberOfBorrowedBooks; i++) {
	borrowBooksData.push({
		bookID: faker.random.arrayElement(bookIDs),
		borrowerID: faker.random.arrayElement(borrowerIDs),
		borrowDate: faker.date.past(),
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
