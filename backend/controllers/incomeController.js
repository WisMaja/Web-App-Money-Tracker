const { Income, User } = require('../models');

/**
 * Pobieranie wszystkich przychodów użytkownika
 */
const getUserIncomes = async (req, res) => {
  try {
    const incomes = await Income.findAll({ where: { userId: req.params.userId } });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania przychodów' });
  }
};

/**
 * Dodawanie nowego przychodu i aktualizacja balance
 */
const addIncome = async (req, res) => {
  try {
    const { userId, source, amount, date } = req.body;

    // Tworzenie nowego przychodu
    const income = await Income.create({ userId, source, amount, date });

    // Pobranie użytkownika i aktualizacja salda
    const user = await User.findByPk(userId);
    if (user) {
      await user.updateBalance();
    }

    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas dodawania przychodu' });
  }
};

/**
 * Aktualizacja istniejącego przychodu
 */
const updateIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;
    const income = await Income.findByPk(req.params.incomeId);

    if (!income) {
      return res.status(404).json({ error: 'Przychód nie znaleziony' });
    }

    await income.update({ source, amount, date });

    // Pobranie użytkownika i aktualizacja salda
    const user = await User.findByPk(income.userId);
    if (user) {
      await user.updateBalance();
    }

    res.json(income);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas aktualizacji przychodu' });
  }
};

/**
 * Usuwanie przychodu i aktualizacja balance
 */
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByPk(req.params.incomeId);

    if (!income) {
      return res.status(404).json({ error: 'Przychód nie znaleziony' });
    }

    const userId = income.userId;
    await income.destroy();

    // Pobranie użytkownika i aktualizacja salda
    const user = await User.findByPk(userId);
    if (user) {
      await user.updateBalance();
    }

    res.json({ message: 'Przychód usunięty' });
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas usuwania przychodu' });
  }
};

module.exports = {
  getUserIncomes,
  addIncome,
  updateIncome,
  deleteIncome
};

