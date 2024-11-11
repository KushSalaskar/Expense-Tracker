const Sequelize = require('sequelize');

const dbName = process.env.DB_NAME || 'expense_tracker';
const dbUser = process.env.DB_USER || 'kushsalaskar';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbHost = process.env.DB_HOST || 'localhost';

const db = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres',

    pool: {
        max: 1000,
        min: 5,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;