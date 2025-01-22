const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:  process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false, // Można włączyć logowanie zapytań SQL
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