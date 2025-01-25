const { Expense, User } = require('../models');

/**
 * Pobieranie wszystkich wydatków użytkownika
 */
const getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.params.userId } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania wydatków' });
  }
};

/**
 * Dodawanie nowego wydatku i aktualizacja balance
 */
const addExpense = async (req, res) => {
  try {
    const { userId, category, amount, date } = req.body;

    // Tworzenie nowego wydatku
    const expense = await Expense.create({ userId, category, amount, date });

    // Pobranie użytkownika i aktualizacja salda
    const user = await User.findByPk(userId);
    if (user) {
      await user.updateBalance();
    }

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas dodawania wydatku' });
  }
};


const updateExpense = async (req, res) => {
  try {
    const { category, amount, date } = req.body;
    const expense = await Expense.findByPk(req.params.expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Wydatek nie znaleziony' });
    }

    await expense.update({ category, amount, date });

    const user = await User.findByPk(expense.userId);
    if (user) {
      await user.updateBalance();
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas aktualizacji wydatku' });
  }
};


const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Wydatek nie znaleziony' });
    }

    const userId = expense.userId;
    await expense.destroy();

    const user = await User.findByPk(userId);
    if (user) {
      await user.updateBalance();
    }

    res.json({ message: 'Wydatek usunięty' });
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas usuwania wydatku' });
  }
};

module.exports = {
  getUserExpenses,
  addExpense,
  updateExpense,
  deleteExpense
};
