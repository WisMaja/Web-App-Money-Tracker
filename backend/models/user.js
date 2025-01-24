'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Metoda do definiowania asocjacji (relacji).
     */
    static associate(models) {
      // W przyszłości połączymy użytkownika z tabelą wydatków
      User.hasMany(models.Expense, { foreignKey: 'userId', as: 'expenses' });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Sprawdza, czy to poprawny email
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users', // Nazwa tabeli w bazie
      timestamps: true,   // Automatyczne kolumny createdAt i updatedAt
    }
  );

  return User;
};
