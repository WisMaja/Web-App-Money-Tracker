const express = require('express');
const { getUserById, createUser, deleteUserById } = require('../controllers/userController');

const router = express.Router();

// Pobranie danych użytkownika
router.get('/:userId', getUserById);

// Dodanie użytkownika
router.post('/', createUser);

//Usuniecie użytkownika
router.delete('/:userId', deleteUserById);

module.exports = router;
