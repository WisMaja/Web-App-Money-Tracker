'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    static associate(models) {
      Income.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Income.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      source: {
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
      modelName: 'Income',
      tableName: 'Incomes',
      timestamps: true,
      hooks: {
        afterCreate: async (income, options) => {
          const user = await income.getUser();
          if (user) await user.updateBalance();
        },
        afterDestroy: async (income, options) => {
          const user = await income.getUser();
          if (user) await user.updateBalance();
        }
      }
    }
  );

  return Income;
};
