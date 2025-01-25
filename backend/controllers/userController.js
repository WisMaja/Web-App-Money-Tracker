const { User } = require('../models');

/**
 * Pobranie danych użytkownika na podstawie `userId`
 */
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

module.exports = {
  getUserById
};
