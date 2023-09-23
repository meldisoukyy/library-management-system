const express = require('express');
const bookController = require('../../controllers/book');

const router = express.Router();

router
	.route('/')
	.get(bookController.getAllBooks)
	.post(bookController.createBook)

module.exports = router;