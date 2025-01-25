const express = require('express');
const { getUserById } = require('../controllers/userController');

const router = express.Router();

// Pobranie danych użytkownika
router.get('/:userId', getUserById);

module.exports = router;
