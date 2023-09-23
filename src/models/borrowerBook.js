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
      // define association here
    }
  }
  BorrowerBook.init({
    bookId: {
      type: DataTypes.UUID,
      references: {
        model: 'Book',
        key: 'uuid'
      }
    },
    borrowerId: {
      type: DataTypes.UUID,
      references: {
        model: 'Borrower',
        key: 'uuid'
      }
    },
    borrowedDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    returnDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BorrowerBook',
  });
  return BorrowerBook;
};