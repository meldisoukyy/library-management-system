
const express = require('express');
const { borrowBookController } = require('../../controllers');

const router = express.Router();

router
	.route('/checkout')
    .post(borrowBookController.checkoutBook);

router
    .route('/return')
    .post(borrowBookController.returnBook);

router
    .route('/current')
    .get(borrowBookController.getBorrowerCurrentBooks);

router
    .route('/overdue')
    .get(borrowBookController.getOverdueBooks);

module.exports = router;
