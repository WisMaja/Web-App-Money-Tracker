'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expense.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Expense.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE' // Jeśli użytkownik zostanie usunięty, usuwamy też jego wydatki
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Expense',
      tableName: 'Expenses',
      timestamps: true, // Automatycznie dodaje createdAt i updatedAt
    }
  );
  return Expense;
};