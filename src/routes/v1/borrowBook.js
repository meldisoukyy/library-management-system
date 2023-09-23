
const express = require('express');
const { borrowBookController } = require('../../controllers');

const router = express.Router();

router
	.route('/checkout')
    .post(borrowBookController.checkoutBook);

module.exports = router;
