const express = require('express');
const { getUserById, createUser, deleteUserById, loginUser } = require('../controllers/userController');

const router = express.Router();

// Pobranie użytkownika
router.get('/:userId', getUserById);

// Dodanie użytkownika
router.post('/', createUser);

// Usunięcie użytkownika
router.delete('/:userId', deleteUserById);

// Logowanie użytkownika
router.post('/login', loginUser);

module.exports = router;
