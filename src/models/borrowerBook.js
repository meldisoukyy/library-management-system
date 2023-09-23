'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BorrowerBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.BorrowerBook.belongsTo(models.Borrower, {
        foreignKey: 'borrowerID',
        as: 'borrower'
      });
      models.BorrowerBook.belongsTo(models.Book, {
        foreignKey: 'bookID',
        as: 'book'
      });
    }
  }
  BorrowerBook.init({
    bookID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Book',
        key: 'id'
      }
    },
    borrowerID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Borrower',
        key: 'id'
      }
    },
    borrowDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    returnDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BorrowerBook',
  });
  return BorrowerBook;
};