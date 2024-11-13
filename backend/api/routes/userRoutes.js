const { body } = require('express-validator');
const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.route('/')
    .post(
        body('firstName').trim().not().isEmpty().withMessage("First name is required"),
        body('lastName').trim().not().isEmpty().withMessage("Last name is required"),
        body('username').trim().not().isEmpty().withMessage("Username is a mandatory field"),
        body('password').trim().not().isEmpty().withMessage("Please enter a password"),
        userController.signUp
    )

module.exports = router