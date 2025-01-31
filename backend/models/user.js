'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Definiowanie asocjacji (relacji).
     */
    static associate(models) {
      User.hasMany(models.Expense, { foreignKey: 'userId', as: 'expenses' });
      User.hasMany(models.Income, { foreignKey: 'userId', as: 'incomes' });
    }

    /**
     * Metoda do aktualizacji salda użytkownika
     */
    async updateBalance() {
      const incomes = await this.getIncomes();
      const expenses = await this.getExpenses();

      const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
      const totalExpense = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

      this.balance = totalIncome - totalExpense;
      await this.save();
    }
  }

  User.init(
    {
      nickName:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      firstName:{
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName:{
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.00
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true
    }
  );

  return User;
};
