const { Book } = require('../models');

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

module.exports = {
	queryBooks,
	createBook,
};
