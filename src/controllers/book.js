const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');
const {
  getOffsetAndLimitAndPage,
  getPaginateInfo
} = require('../utils/paginate');

const getAllBooks = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const { offset, limit: _limit } = getOffsetAndLimitAndPage(page, limit);
  const { count, books } = await bookService.queryBooks(offset, _limit);
  response = {
    books,
    paginate: getPaginateInfo(count, page, limit)
  };
  res.status(httpStatus.OK).send(response);
});

const createBook = catchAsync(async (req, res) => {
  const book = await bookService.createBook(req.body);
  res.status(httpStatus.CREATED).send(book);
});

const updateBook = catchAsync(async (req, res) => {
  const bookUUID = req.params.uuid;
  const book = await bookService.updateBook(bookUUID, req.body);
  res.status(httpStatus.OK).send(book);
});

const getBook = catchAsync(async (req, res) => {
  const bookUUID = req.params.uuid;
  const book = await bookService.getBook(bookUUID);
  res.status(httpStatus.OK).send(book);
});

const deleteBook = catchAsync(async (req, res) => {
  const bookUUID = req.params.uuid;
  await bookService.deleteBook(bookUUID);
  res.status(httpStatus.NO_CONTENT).send();
});

const searchBooks = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const { offset, limit: _limit } = getOffsetAndLimitAndPage(page, limit);
  const { count, books } = await bookService.searchBooks(
    req.query.q,
    offset,
    _limit
  );
  response = {
    books,
    paginate: getPaginateInfo(count, page, limit)
  };
  res.status(httpStatus.OK).send(response);
});

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  getBook,
  deleteBook,
  searchBooks
};
