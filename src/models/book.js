'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Book extends Model {
		static associate(models) {
			models.Book.belongsToMany(models.Borrower, {
				as: 'borrowers',
				through: 'BorrowerBook',
			});
		}

		toJSON() {
			return {
				...this.get(),
				id: undefined,
			};
		}
	}
	Book.init(
		{
			uuid: {
				type: DataTypes.UUID,
				allowNull: false,
				unique: true,
				defaultValue: DataTypes.UUIDV4,
			},
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
