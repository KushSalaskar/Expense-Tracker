const db = require('../db_config/db_config');
const Sequelize = require('sequelize');

const User = db.define('users', {
    id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true

    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = User