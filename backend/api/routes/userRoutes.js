const { body } = require('express-validator');
const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.route('/')
    .post(
        body('firstName').trim().not().isEmpty().withMessage("First name is required"),
        body('lastName').trim().not().isEmpty().withMessage("Last name is required"),
        body('username').trim().not().isEmpty().withMessage("Username is a mandatory field"),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        userController.signUp
    )

router.route('/:username')
    .get(
        // add auth later
        userController.getUser
    )

router.route('/:id')
    .put(
        // add auth later
        body('firstName').trim().not().isEmpty().withMessage("First name is required"),
        body('lastName').trim().not().isEmpty().withMessage("Last name is required"),
        body('username').trim().not().isEmpty().withMessage("Username is a mandatory field"),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        userController.updateUser
    )

module.exports = router