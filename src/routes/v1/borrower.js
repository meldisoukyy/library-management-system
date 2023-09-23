const express = require('express');
const { borrowerController } = require('../../controllers');

const router = express.Router();

router
	.route('/')
	.post(borrowerController.registerBorrower)
	.get(borrowerController.getAllBorrowers);

router
	.route('/:id')
	.get(borrowerController.getBorrower)
	.put(borrowerController.updateBorrower)
	.delete(borrowerController.deleteBorrower);

module.exports = router;
