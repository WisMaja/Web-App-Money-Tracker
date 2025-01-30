require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const sequelize = require('./config/database');
const bodyParser = require('body-parser');

const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const incomeRoutes = require('./routes/incomeRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/incomes', incomeRoutes);

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