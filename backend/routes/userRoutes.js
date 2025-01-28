const express = require('express');
const { getUserById, createUser } = require('../controllers/userController');

const router = express.Router();

// Pobranie danych użytkownika
router.get('/:userId', getUserById);

// Dodanie użytkownika
router.post('/', createUser);

//Usuniecie użytkownika
// router.delete('/userId', de)

// router.get('/get', (res, req) => {
//     getUserById
// })

module.exports = router;
