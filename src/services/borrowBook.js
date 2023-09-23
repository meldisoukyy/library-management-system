const httpStatus = require('http-status');
const { Borrower, Book, BorrowerBook } = require('../models');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const checkoutBook = async (borrowerID, bookID, borrowDate, dueDate) => {
	const borrower = await Borrower.findOne({
		where: {
			id: borrowerID,
		},
	});
	if (!borrower) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Borrower not found');
	}

	const book = await Book.findOne({
		where: {
			id: bookID,
		},
	});
	if (!book) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
	}
	if (book.quantity <= 0) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Book is out of stock');
	}

	const borrowerBook = await BorrowerBook.findOne({
		where: {
			[Op.and]: [
				{ borrowerID: borrowerID },
				{ bookID: bookID },
				{ returnDate: null },
			],
		},
	});
	if (borrowerBook) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Book is already borrowed');
	}

	const newBorrowerBook = await BorrowerBook.create({
		borrowerID,
		bookID,
		borrowDate,
		dueDate,
	});

	await book.update({
		quantity: book.quantity - 1,
	});

	return newBorrowerBook;
};

const returnBook = async (borrowerID, bookID, returnDate) => {
	const borrower = await Borrower.findOne({
		where: {
			id: borrowerID,
		},
	});
	if (!borrower) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Borrower not found');
	}

	const book = await Book.findOne({
		where: {
			id: bookID,
		},
	});
	if (!book) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
	}

	const borrowerBook = await BorrowerBook.findOne({
		where: {
			[Op.and]: [
				{ borrowerID: borrowerID },
				{ bookID: bookID },
				{ returnDate: null },
			],
		},
		limit,
		offset,
	});
	if (!borrowerBook) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Book is not borrowed');
	}

	await borrowerBook.update({
		returnDate,
	});

	await book.update({
		quantity: book.quantity + 1,
	});

	return borrowerBook;
};

const getBorrowerCurrentBooks = async (borrowerID, offset, limit) => {
	const borrower = await Borrower.findOne({
		where: {
			id: borrowerID,
		},
	});
	if (!borrower) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Borrower not found');
	}

	const { count, rows } = await BorrowerBook.findAndCountAll({
		where: {
			[Op.and]: [{ borrowerID: borrowerID }, { returnDate: null }],
		},
        limit,
        offset
	});

	return {
		results: rows,
		total: count,
	};
};

const getOverdueBooks = async (offset, limit) => {
	const { count, rows } = await BorrowerBook.findAndCountAll({
		where: {
			[Op.and]: [
				{ returnDate: null },
				{ dueDate: { [Op.lt]: new Date() } },
			],
		},
		offset,
		limit,
	});

	return {
		results: rows,
		total: count,
	};
};

module.exports = {
	checkoutBook,
	returnBook,
	getBorrowerCurrentBooks,
	getOverdueBooks,
};
