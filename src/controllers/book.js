const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');
const { getOffsetAndLimitAndPage, getPaginateInfo } = require('../utils/paginate');

const getAllBooks = catchAsync(async (req, res) => {
	const { page, limit } = req.query;
	const { offset, limit: _limit } = getOffsetAndLimitAndPage(page, limit);
	const { count, books } = await bookService.queryBooks(offset, _limit);
	response = {
		books: books,
		paginate: getPaginateInfo(count, page, limit),
	};
	res.status(httpStatus.OK).send(response);
});

const createBook = catchAsync(async (req, res) => {
	const book = await bookService.createBook(req.body);
	res.status(httpStatus.CREATED).send(book);
});

module.exports = {
	getAllBooks,
	createBook,
};
