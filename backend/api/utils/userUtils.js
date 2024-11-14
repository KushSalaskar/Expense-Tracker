const User = require("../models/users");

//Creating a new user
const signUpUser = async (user) => {
    return await User.create(user);
}

// Check is a user exists
const checkExistingUser = async (username) => {
    return await User.findOne({ where: { username: username } });
}

// Get user by id
const getUserWithId = async (id) => {
    try {
        return await User.findOne({ where: { id: id } });
    } catch (error) {
        console.log(`Could not find user with id: ${id}`);
        return null;
    }
}

module.exports = {
    signUpUser,
    checkExistingUser,
    getUserWithId,
}