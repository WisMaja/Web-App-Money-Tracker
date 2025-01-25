const express = require('express');
const { getUserExpenses, addExpense, updateExpense, deleteExpense } = require('../controllers/expenseController');

const router = express.Router();

// Pobranie wszystkich wydatków użytkownika
router.get('/:userId', getUserExpenses);

// Dodanie nowego wydatku
router.post('/', addExpense);

// Aktualizacja wydatku
router.put('/:expenseId', updateExpense);

// Usuwanie wydatku
router.delete('/:expenseId', deleteExpense);

module.exports = router;
