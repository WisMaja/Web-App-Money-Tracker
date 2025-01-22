require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/status', (req, res) => {
    res.json({ message: "Backend działa poprawnie!" });
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});