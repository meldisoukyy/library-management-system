'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
	class Borrower extends Model {
		static associate(models) {
			models.Borrower.belongsToMany(models.Book, {
				as: 'books',
				through: 'BorrowerBook',
				foreignKey: 'borrowerID',
				otherKey: 'bookID',
			});
			models.Borrower.hasMany(models.BorrowerBook, {
				as: 'borrowerBooks',
				foreignKey: 'borrowerID',
			});
		}

		toJSON() {
			return { ...this.get(), password: undefined };
		}

		isPasswordMatch(password) {
			return bcrypt.compareSync(password, this.password);
		}
	}
	Borrower.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true,
					isLowercase: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				set(value) {
					if (!value) return;
					this.setDataValue('password', bcrypt.hashSync(value, 10));
				},
				validate: {
					min: 6,
					isPassword(value) {
						if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
							throw new Error(
								'Password must contain at least one letter and one number'
							);
						}
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'Borrower',
			createdAt: 'registeredDate',
		}
	);
	return Borrower;
};
