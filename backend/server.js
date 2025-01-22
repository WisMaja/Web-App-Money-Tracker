require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/status', (req, res) => {
    res.json({ message: "Backend działa poprawnie!" });
});

sequelize.sync().then(()=> {
    console.log("Bazadanych została poprawnie połączona")
}).catch(err => {
    console.error("Bład z bazą:", err)
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});