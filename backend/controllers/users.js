const userService = require('../services/users');

/**
 * Creates a new user.
 * @param {Object} req - Express request object containing user details in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */

const createUser = async (req, res, next) => {
    try {
        const { userName, password, firstName, lastName, profilePic } = req.body;
        const newUser = await userService.createUser(userName, password, firstName, lastName, profilePic);
        res.status(201).json(newUser);
    } catch (error) {
        next(error); 
    }
};

/**
 * Retrieves the current user's details.
 * @param {Object} req - Express request object with user details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getUser = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a user's friends if the user has access rights.
 * @param {Object} req - Express request object containing user information.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getFriends = async (req, res, next) => {
    try {
        const currentUser = req.user;
        if (!currentUser) {
            const error = new Error('User not authenticated');
            error.status = 401;
            throw error;
        }
        const userFriends = await userService.getAuthorizedFriends(
            currentUser,
            req.params.id
        );
        res.status(200).json(userFriends);
    } catch (error) {
        next(error); 
    }
};
/**
 * Retrieves pending friend requests for the current user.
 * @param {Object} req - Express request object with user details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getRequests = async (req, res, next) => {
    try {
        const requests = await userService.getRequests(req.user);
        if (!requests) {
            const error = new Error('No friend requests found');
            error.status = 404;
            throw error;
        }
        res.status(200).json(requests);
    } catch (error) {
        next(error);
    }
};

/**
 * Approves a friend request for the current user.
 * @param {Object} req - Express request object with friend ID as a parameter.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const approveRequest = async (req, res, next) => {
    try {
        const user = await userService.approveRequest(req.user, req.params.fid);
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes a friend from the current user's friends list.
 * @param {Object} req - Express request object with friend ID as a parameter.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const deleteFriend = async (req, res, next) => {
    try {
        const user = await userService.deleteFriend(req.user, req.params.fid);
        if (!user) {
            const error = new Error('Friend not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes a user by their ID.
 * @param {Object} req - Express request object with user ID as a parameter.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const deleteUser = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof NotFoundError) {
            error.status = 404;
        } else if (error instanceof DeletionError) {
            error.status = 500;
        }
        next(error);
    }
};

/**
 * Updates user details such as first name, last name, and profile picture.
 * @param {Object} req - Express request object containing new details in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const updateUser = async (req, res, next) => {
    try {
        const { firstName, lastName, profilePic } = req.body;
        const user = await userService.updateUser(req.user, firstName, lastName, profilePic);
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
/**
 * Retrieves posts of a user if access rights are valid.
 * @param {Object} req - Express request object with user ID as a parameter.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getPostsOf = async (req, res, next) => {
    try {
        const currentUser = req.user;
        const friends = currentUser.friends;
        const friend = await userService.getUserByUserName(req.params.id);
        if (req.params.id === req.user.userName || friends.includes(friend._id)) {
        const posts = await userService.getPostsOf(req.params.id);
        if (!posts) {
            const error = new Error('No posts found');
            error.status = 404; 
            throw error;
        }
        res.status(200).json(posts);
    }

    } catch (error) {
        next(error);  
    }
};


/**
 * Sends a new friend request.
 * @param {Object} req - Express request object with recipient ID in the params and sender username in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const newFriendRequest = async (req, res, next) => {
    try {
        const user = await userService.addFriendRequest(req.params.id, req.body.userName);
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        if (user === 'exist') {
            const error = new Error('Friend request already exists');
            error.status = 403;
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {createUser,getUser,getFriends,getRequests,approveRequest,
    deleteFriend,deleteUser,updateUser,getPostsOf,newFriendRequest,
};
