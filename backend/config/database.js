const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false, // Można ustawić na true, aby widzieć zapytania SQL w logach
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const testConnection = async() => {
    try{
        await sequelize.authenticate();
        console.log('Połaczenie z baza danych powiodło sie');
    }
    catch (error)
    {
        console.error('Bład połaczenia z baza:', error);
    }
};

testConnection();

module.exports = sequelize;