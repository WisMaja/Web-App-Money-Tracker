// backend/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Wczytywanie zmiennych środowiskowych z pliku .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Podstawowa trasa
app.get('/', (req, res) => {
  res.send('Backend działa!');
});

// Port, na którym nasłuchuje aplikacja
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
