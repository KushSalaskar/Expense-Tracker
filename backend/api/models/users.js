const db = require('../db_config/db_config');
const Sequelize = require('sequelize');

const User = db.define('users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
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
    created_at: {
        type: Sequelize.DATE
    },
    updated_at: {
        type: Sequelize.DATE
    },
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = User