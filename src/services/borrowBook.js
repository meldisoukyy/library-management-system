const httpStatus = require('http-status');
const { Borrower, Book, BorrowerBook } = require('../models');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const checkoutBook = async (borrowerUUID, bookUUID, borrowedDate, dueDate) => {
    const borrower = await Borrower.findOne({
        where: {
            uuid: borrowerUUID,
        },
    });
    if (!borrower) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Borrower not found');
    }
    
    const book = await Book.findOne({
        where: {
            uuid: bookUUID,
        },
    });
    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    if (book.quantity <= 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Book is out of stock');
    }

    const borrowerBook = await BorrowerBook.findOne({
        where: {
            [Op.and]: [
                { borrowerId: borrowerUUID },
                { bookId: bookUUID },
                { returnDate: null },
            ],
        },
    });
    if (borrowerBook) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Book is already borrowed');
    }

    const newBorrowerBook = await BorrowerBook.create({
        borrowerId: borrowerUUID,
        bookId: bookUUID,
        borrowedDate,
        dueDate
    });

    await book.update({
        quantity: book.quantity - 1,
    });

    return newBorrowerBook;
};

module.exports = {
    checkoutBook,
}