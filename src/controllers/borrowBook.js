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

module.exports = {
	checkoutBook,
	returnBook,
};
