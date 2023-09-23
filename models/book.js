'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Book extends Model {
		static associate(models) {
			// define association here
		}
	}
	Book.init(
		{
			uuid: {
				type: DataTypes.UUID,
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
