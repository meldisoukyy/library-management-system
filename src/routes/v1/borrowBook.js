
const express = require('express');
const { borrowBookController } = require('../../controllers');

const router = express.Router();

router
	.route('/checkout')
    .post(borrowBookController.checkoutBook);

router
    .route('/return')
    .post(borrowBookController.returnBook);

module.exports = router;
