const User = require("../models/users");

//Creating a new user
const signUpUser = async (user) => {
    return await User.create(user);
}

// Check is a user exists
const checkExistingUser = async (username) => {
    return await User.findOne({ where: { username: username } });
}

module.exports = {
    signUpUser,
    checkExistingUser
}