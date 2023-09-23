const express = require('express');
const { bookController } = require('../../controllers');

const router = express.Router();

router
	.route('/')
	.get(bookController.getAllBooks)
	.post(bookController.createBook);

router
	.route('/:id')
	.get(bookController.getBook)
	.put(bookController.updateBook)
	.delete(bookController.deleteBook);

router.route('/search').get(bookController.searchBooks);

module.exports = router;
