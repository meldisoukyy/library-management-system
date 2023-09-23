const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { borrowBookService } = require('../services');
const {
	getOffsetAndLimitAndPage,
	getPaginateInfo,
} = require('../utils/paginate');
const ApiError = require('../utils/ApiError');

const checkoutBook = catchAsync(async (req, res) => {
	const { borrowerID, bookID, borrowDate, dueDate } = req.body;
	if (!borrowerID || !bookID || !dueDate) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields');
	}

	const borrowBook = await borrowBookService.checkoutBook(
		borrowerID,
		bookID,
		borrowDate || new Date(),
		dueDate
	);
	res.status(httpStatus.OK).send(borrowBook);
});

const returnBook = catchAsync(async (req, res) => {
	const { borrowerID, bookID, returnDate } = req.body;
	if (!borrowerID || !bookID) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields');
	}

	const borrowBook = await borrowBookService.returnBook(
		borrowerID,
		bookID,
		returnDate || new Date()
	);
	res.status(httpStatus.OK).send(borrowBook);
});

const getBorrowerCurrentBooks = catchAsync(async (req, res) => {
	const { borrowerID } = req.body;
	if (!borrowerID) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields');
	}

	const { page, limit } = req.query;

	const { offset, _limit, _page } = getOffsetAndLimitAndPage(page, limit);
	const { results, total } = await borrowBookService.getBorrowerCurrentBooks(
		borrowerID,
		offset,
		_limit
	);
	const paginateInfo = getPaginateInfo(total, _limit, _page);
	res.status(httpStatus.OK).send({ books: results, paginate: paginateInfo });
});

const getOverdueBooks = catchAsync(async (req, res) => {
    const { page, limit } = req.query;
	const { offset, _limit, _page } = getOffsetAndLimitAndPage(page, limit);
	const { results, total } = await borrowBookService.getOverdueBooks(
		offset,
		_limit
	);
	const paginateInfo = getPaginateInfo(total, _limit, _page);
	res.status(httpStatus.OK).send({ books: results, paginate: paginateInfo });
});

module.exports = {
	checkoutBook,
	returnBook,
	getBorrowerCurrentBooks,
	getOverdueBooks,
};
