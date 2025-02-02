const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "your_secret_key";

//LOGOWANIE
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sprawdzenie, czy użytkownik istnieje
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
    }

    // Sprawdzenie hasła
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      return res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
    }

    // Tworzenie tokena JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Zalogowano pomyślnie', token });
  } catch (error) {
    console.error('Błąd logowania:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

//Wyszukaj Uzywtkownika
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania użytkownika' });
  }
};

//Wyszukaj Uzywtkownika
const getUserBalanceById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
    }

    res.json(user.balance);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania użytkownika' });
  }
};



//Rejestracja
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Użytkownik już istnieje' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      balance: 0.00
    });

    res.status(201).json({ message: 'Użytkownik utworzony!', userId: newUser.id });
  } catch (error) {
    console.error('Błąd podczas tworzenia użytkownika:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
    }

    // Usuwanie użytkownika
    await user.destroy();

    res.status(200).json({ message: 'Użytkownik został usunięty' });
  } catch (error) {
    console.error('Błąd podczas usuwania użytkownika:', error);
    res.status(500).json({ error: 'Błąd podczas usuwania użytkownika' });
  }
};


const getGuestUser = async (req, res) => {
  try {
    // Szukamy użytkownika o nicku "Gość"
    const guestUser = await User.findOne({ where: { nickName: 'Gość' } });

    if (!guestUser) {
      return res.status(404).json({ error: 'Użytkownik Gość nie istnieje' });
    }

    // Zwracamy ID, nickname oraz balans użytkownika Gość
    res.json({ id: guestUser.id, nickname: guestUser.nickName, balance: guestUser.balance });
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania użytkownika Gość' });
  }
};

module.exports = {
  getUserById,
  createUser,
  deleteUserById,
  loginUser,
  getGuestUser,
  getUserBalanceById
};
