const express = require('express');
const cors = require('cors');
const { connectDB, syncDB } = require('./db_config/db');
const cookieParser = require('cookie-parser');


// Initialize Express app
const app = express();

// Connect to the database
connectDB();
// Sync the database
syncDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

module.exports = app;
