const httpStatus = require('http-status');
const { Book } = require('../models');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const queryBooks = async (offset, limit) => {
	const { count, rows } = await Book.findAndCountAll({ limit, offset });
	return {
		count,
		books: rows,
	};
};

const createBook = async (bookBody) => {
	const book = await Book.create(bookBody);
	return book;
};

const updateBook = async (bookID, updateBody) => {
	const book = await Book.findOne({ where: { id: bookID } });
	if (!book) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
	}

	Object.assign(book, updateBody);
	await book.save();
	return book;
};

const getBook = async (bookID) => {
	const book = await Book.findOne({ where: { id: bookID } });
	if (!book) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
	}
	return book;
};

const deleteBook = async (bookID) => {
	const book = await Book.findOne({ where: { id: bookID } });
	if (!book) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
	}

	await book.destroy();
	return book;
};

const searchBooks = async (query, offset, limit) => {
	const { count, rows } = await Book.findAndCountAll({
		where: {
			[Op.or]: [
				{
					title: {
						[Op.like]: `${query}%`,
					},
				},
				{
					author: {
						[Op.like]: `${query}%`,
					},
				},
				{
					isbn: {
						[Op.like]: `${query}%`,
					},
				},
			],
		},
		limit,
		offset,
	});
	return {
		count,
		books: rows,
	};
};

module.exports = {
	queryBooks,
	createBook,
	updateBook,
	getBook,
	deleteBook,
	searchBooks,
};
