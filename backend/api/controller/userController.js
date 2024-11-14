const { validationResult } = require("express-validator");
const { signUpUser, checkExistingUser, getUserWithId, updateUserById } = require("../utils/userUtils");
const bcrypt = require("bcryptjs");
const { set } = require("../app");

//Error Handler util
const errorHandler = async (res, message, statusCode=500) => {
    res.status(statusCode);
    res.json({error: message});
}

//Success Handler util
const setSuccessMessage = async (res, message, statusCode=200) => {
    res.status(statusCode);
    res.json(message);
}


//Functional Controllers
const signUp = async (req, res) => {
    try {
        // Check the validators array from basic validators
        const validatorErrs = validationResult(req)
        if (!validatorErrs.isEmpty()) {
            return errorHandler(res, validatorErrs, 400);
        }

        // Give errors if the following fields are entered
        if (req.body.id || req.body.created_at || req.body.updated_at || req.body.createdAt || req.body.updatedAt) {
            return errorHandler(res, `Cannot enter the fields <id, created_at, createdAt, updated_at, updatedAt> through this API`, 400);
        }

        //Check if the user already exists
        const existingUser = await checkExistingUser(req.body.username);
        if (typeof existingUser === "object" && existingUser !== null) {
            return errorHandler(res, `User with username: ${req.body.username} already exists`, 409);
        }

        // Encrypt password
        const user = await signUpUser({...req.body, password: bcrypt.hashSync(req.body.password, 10)});

        // Return json of the user without password
        const userData = user.toJSON();
        let {password, ...userResp} = {...userData};
        console.log(`Successfully created new user: ${userResp}`, 201);
        setSuccessMessage(res, userResp);

    } catch (error) {
        console.log(`userController::signUp error: ${error}`);
        return errorHandler(res, `Encountered problem when signing up user: ${error}`, 400);
    }
}

const getUserbyId = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the user exists
        let user = await getUserWithId(id);
        if (user === null) {
            return errorHandler(res, `Could not find user with id: ${id}`, 404);
        }

        const userData = user.toJSON();
        // Return user without password
        let {password, ...currentUser} = {...userData};
        setSuccessMessage(res, currentUser, 200);
    } catch (error) {
        console.log(`userController::getUserbyId error: ${error}`);
        return errorHandler(res, `Encountered problem while getting user with id: ${req.params.id}`, 400);
    }
}

const getUser = async (req, res) => {
    try {
        const username = req.params.username;

        // Check if the user exists
        let user = await checkExistingUser(username);
        if (user === null) {
            return errorHandler(res, `Could not find user with username: ${username}`, 404);
        }

        const userData = user.toJSON();
        // Return user without password
        let {password, id, ...currentUser} = {...userData};
        setSuccessMessage(res, currentUser, 200);
    } catch (error) {
        console.log(`userController::getUser error: ${error}`);
        return errorHandler(res, `Encountered problem while getting user with username: ${req.params.username}`, 400);
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Check the validators array from basic validators
        const validatorErrs = validationResult(req)
        if (!validatorErrs.isEmpty()) {
            return errorHandler(res, validatorErrs, 400);
        }

        if (req.body.id || req.body.created_at || req.body.updated_at || req.body.createdAt || req.body.updatedAt) {
            return errorHandler(res, `Cannot enter the fields <id, created_at, createdAt, updated_at, updatedAt> through this API`, 400);
        }

        // Check if the user exists
        let user = await getUserWithId(id);
        if (user === null) {
            return errorHandler(res, `Could not find user with id: ${id}`, 404);
        }

        const newUser = {};
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.username = req.body.username;
        newUser.password = bcrypt.hashSync(req.body.password, 10)

        await updateUserById(id, newUser);
        setSuccessMessage(res, "", 204);
    } catch (error) {
        console.log(`userController::updateUser error: ${error}`);
        return errorHandler(res, `Encountered problem while updating user: ${req.params.id}`, 400);
    }
}

module.exports = {
    signUp,
    getUserbyId,
    getUser,
    updateUser,
}