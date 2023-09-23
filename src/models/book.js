'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Book extends Model {
		static associate(models) {
			models.Book.belongsToMany(models.Borrower, {
				as: 'borrowers',
				through: 'BorrowerBook',
				foreignKey: 'bookID',
				otherKey: 'borrowerID',
			});
			models.Book.hasMany(models.BorrowerBook, {
				as: 'borrowerBooks',
				foreignKey: 'bookID',
			});
		}

		toJSON() {
			return {
				...this.get(),
			};
		}
	}
	Book.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			author: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isbn: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			shelfLocation: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Book',
		}
	);
	return Book;
};
