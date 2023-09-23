'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Borrowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          isLowercase: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          if (!value) return;
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
        validate: {
          min: 6,
          isPassword(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
              throw new Error('Password must contain at least one letter and one number');
            }
          }
        }
      },
      registeredDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Borrowers');
  }
};