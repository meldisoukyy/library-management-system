const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { borrowerService } = require('../services');
const {
	getOffsetAndLimitAndPage,
	getPaginateInfo,
} = require('../utils/paginate');

const getAllBorrowers = catchAsync(async (req, res) => {
	const { page, limit } = req.query;
	const { offset, limit: _limit } = getOffsetAndLimitAndPage(page, limit);
	const { count, borrowers } = await borrowerService.getAllBorrowers(
		offset,
		_limit
	);
	response = {
		borrowers,
		paginate: getPaginateInfo(count, page, limit),
	};
	res.status(httpStatus.OK).send(response);
});

const getBorrower = catchAsync(async (req, res) => {
	const { id } = req.params;
	const borrower = await borrowerService.getBorrower(id);
	res.status(httpStatus.OK).send(borrower);
});

const registerBorrower = catchAsync(async (req, res) => {
	const { name, email, password } = req.body;
	const borrower = await borrowerService.createBorrower(
		name,
		email,
		password
	);
	res.status(httpStatus.CREATED).send(borrower);
});

const updateBorrower = catchAsync(async (req, res) => {
	const { id } = req.params;
	const borrower = await borrowerService.updateBorrower(id, req.body);
	res.status(httpStatus.OK).send(borrower);
});

const deleteBorrower = catchAsync(async (req, res) => {
	const { id } = req.params;
	await borrowerService.deleteBorrower(id);
	res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
	getAllBorrowers,
	getBorrower,
	registerBorrower,
	updateBorrower,
	deleteBorrower,
};
