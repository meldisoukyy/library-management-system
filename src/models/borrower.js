'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
	class Borrower extends Model {
		static associate(models) {
			models.Borrower.belongsToMany(models.Book, {
				as: 'books',
				through: 'BorrowerBook',
				foreignKey: 'borrowerId',
				otherKey: 'bookId',
			});
		}

		toJSON() {
			return { ...this.get(), id: undefined, password: undefined };
		}

		isPasswordMatch(password) {
			return bcrypt.compareSync(password, this.password);
		}
	}
	Borrower.init(
		{
			uuid: {
				type: DataTypes.UUID,
				allowNull: false,
				unique: true,
				defaultValue: DataTypes.UUIDV4,
			},
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
