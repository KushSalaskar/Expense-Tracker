const { validationResult } = require("express-validator");
const { signUpUser, checkExistingUser } = require("../utils/userUtils");
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
        console.log(`Encountered problem when signing up user: ${error}`);
        return errorHandler(res, `userController::signUp error: ${error}`, 400);
    }
}

module.exports = {
    signUp
}