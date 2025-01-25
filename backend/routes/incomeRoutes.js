const express = require('express');
const { getUserIncomes, addIncome, updateIncome, deleteIncome } = require('../controllers/incomeController');

const router = express.Router();

// Pobranie wszystkich przychodów użytkownika
router.get('/:userId', getUserIncomes);

// Dodanie nowego przychodu
router.post('/', addIncome);

// Aktualizacja przychodu
router.put('/:incomeId', updateIncome);

// Usuwanie przychodu
router.delete('/:incomeId', deleteIncome);

module.exports = router;
