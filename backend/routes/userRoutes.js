const express = require('express');
const { getUserById, createUser, deleteUserById, loginUser, getGuestUser, getUserBalanceById  } = require('../controllers/userController');

const router = express.Router();

router.get('/guest', getGuestUser);

// Pobranie użytkownika
router.get('/:userId', getUserById);

router.get('/balance/:userId', getUserBalanceById);
// Dodanie użytkownika
router.post('/', createUser);

// Usunięcie użytkownika
router.delete('/:userId', deleteUserById);

// Logowanie użytkownika
router.post('/login', loginUser);





module.exports = router;
