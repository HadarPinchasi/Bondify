const loginService = require('../services/login');
const jwt = require('jsonwebtoken');
const key = 'your_secret_key';
const User = require('../models/users');
const bcrypt = require('bcrypt');
//V
const processLogin = async (req, res) => {
    try {
        const userExist = await loginService.getUserLog(req.body.userName, req.body.password);
        if (userExist) {
            const data = { username: req.body.userName }
            const token = jwt.sign(data, key);
            res.status(200).json({ token });
        }
        else {
            res.status(404).send('Invalid username and/or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
}

// Ensure that the user sent a valid token
const isLoggedIn = async (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];

        try {
            // Verify the token is valid
            const data = jwt.verify(token, key);
            const username = data.username;

            // Fetch the user object from the database using the username
            const user = await User.findOne({ userName: username });

            if (user) {
                // Attach the user object to the request object
                req.user = user;

                // Token validation was successful. Continue to the actual function (index)
                return next();
            } else {
                return res.status(401).send('Invalid Token');
            }
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    } else {
        return res.status(403).send('Token required');
    }
}
    module.exports = { processLogin, isLoggedIn };
