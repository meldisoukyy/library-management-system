const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { borrowBookService } = require('../services');
const {
	getOffsetAndLimitAndPage,
	getPaginateInfo,
} = require('../utils/paginate');
const ApiError = require('../utils/ApiError');

const checkoutBook = catchAsync(async (req, res) => {
	// TODO: get borrowerUUID from req.user!
	const { borrowerUUID, bookUUID, borrowedDate, dueDate } = req.body;
	if (!borrowerUUID || !bookUUID || !dueDate) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields');
	}

	const borrowBook = await borrowBookService.checkoutBook(
		borrowerUUID,
		bookUUID,
		borrowedDate || new Date(),
		dueDate
	);
	res.status(httpStatus.OK).send(borrowBook);
});

const returnBook = catchAsync(async (req, res) => {
	const { borrowerUUID, bookUUID, returnDate } = req.body;
	if (!borrowerUUID || !bookUUID) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields');
	}

	const borrowBook = await borrowBookService.returnBook(
		borrowerUUID,
		bookUUID,
		returnDate || new Date()
	);
	res.status(httpStatus.OK).send(borrowBook);
});

const getBorrowerCurrentBooks = catchAsync(async (req, res) => {
	const { borrowerUUID } = req.body;
	if (!borrowerUUID) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields');
	}

	const { offset, limit, page } = getOffsetAndLimitAndPage(req.query);
	const { results, total } = await borrowBookService.getBorrowerCurrentBooks(
		borrowerUUID,
		offset,
		limit
	);
	const paginateInfo = getPaginateInfo(total, limit, page);
	res.status(httpStatus.OK).send({ books: results, paginate: paginateInfo });
});

const getOverdueBooks = catchAsync(async (req, res) => {
    const { offset, limit, page } = getOffsetAndLimitAndPage(req.query);
    const { results, total } = await borrowBookService.getOverdueBooks(
        offset,
        limit
    );
    const paginateInfo = getPaginateInfo(total, limit, page);
    res.status(httpStatus.OK).send({ books: results, paginate: paginateInfo });
});

module.exports = {
	checkoutBook,
	returnBook,
	getBorrowerCurrentBooks,
	getOverdueBooks,
};
