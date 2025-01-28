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

const createUser = async (req, res) =>{
  try{
    const {email, password} = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Użytkownik już istnieje' });
    }

    // Tworzenie użytkownika
    const newUser = await User.create({
      email,
      password: password,
      balance: 0.00
    });
    res.status(201).json({ message: 'Użytkownik utworzony!', userId: newUser.id });
  } catch (error) {
    console.error('Błąd podczas tworzenia użytkownika:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
  
}



module.exports = {
  getUserById,
  createUser
};
