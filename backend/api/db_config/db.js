const db = require('./db_config');

const connectDB = async () => {
    try {
        await db.authenticate();
        if (!process.env.JEST_WORKER_ID) console.log('Connected to the database');
    } catch (err) {
        if (!process.env.JEST_WORKER_ID) console.error(`Error connecting to the database: ${err}`);
    }
}

const syncDB = async () => {
    try {
        await db.sync({ alter: true})
    } catch (err) {
        if (!process.env.JEST_WORKER_ID) console.error(`Error syncing the database: ${err}`);
    }
}

module.exports = {
    connectDB,
    syncDB
}