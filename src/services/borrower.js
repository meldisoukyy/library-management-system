const httpStatus = require('http-status');
const { Borrower } = require('../models');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const getAllBorrowers = async (offset, limit) => {
	const { count, rows } = await Borrower.findAndCountAll({
		offset,
		limit,
	});
	return { count, borrowers: rows};
};

const getBorrower = async (id) => {
	const borrower = await Borrower.findOne({
		where: {
			id,
		},
	});
	if (!borrower) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Borrower not found');
	}
	return borrower;
};

const createBorrower = async (name, email, password) => {
	const borrower = await Borrower.create({ name, email, password });
	return borrower;
};

const updateBorrower = async (id, updateBody) => {
	const borrower = await getBorrower(id);
	Object.assign(borrower, updateBody);
	await borrower.save();
	return borrower;
};

const deleteBorrower = async (id) => {
	const borrower = await getBorrower(id);
	await borrower.destroy();
	return borrower;
};

module.exports = {
	getAllBorrowers,
	getBorrower,
	createBorrower,
	updateBorrower,
	deleteBorrower,
};
