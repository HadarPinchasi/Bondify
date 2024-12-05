const bcrypt = require('bcrypt');
const User = require('../models/users');

/**
 * Authenticates a user by verifying their username and password.
 * Compares the provided password with the hashed password stored in the database.
 * @param {string} userName - The username of the user trying to log in.
 * @param {string} password - The plaintext password provided by the user.
 * @returns {Promise<Object|null>} - The authenticated user object if credentials are valid, or null if authentication fails.
 */
const getUserLog = async (userName, password) => {
    try {
        const user = await User.findOne({ userName });
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    } catch (error) {
        console.error('Error during user authentication:', error);
        return null;
    }
};

module.exports = { getUserLog };
