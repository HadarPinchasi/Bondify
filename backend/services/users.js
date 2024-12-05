const User = require('../models/users');
const Article = require('../models/article');
const bcrypt = require('bcrypt');

/**
 * Creates a new user with a hashed password.
 * @param {string} userName - The username for the new user.
 * @param {string} password - The password for the new user.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} profilePic - URL of the user's profile picture.
 * @returns {Object} - The created user object.
 */
const createUser = async (userName, password, firstName, lastName, profilePic) => {
    try{
    const userExist = await User.findOne({ userName });
    if (userExist) {
        const error = new Error('User already exists');
        error.status = 409;
        throw error;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ userName, password: hashedPassword, firstName, lastName, profilePic });
    return await user.save();}
    catch (error) {
        console.error('Service error:', error.message);
        throw error;
    }
};

/**
 * Retrieves a user by username, excluding the password field.
 * @param {string} userName - The username to search for.
 * @returns {Object|null} - The user object if found, otherwise null.
 * @throws Will throw an error if fetching the user fails.
 */
const getUserByUserName = async (userName) => {
    try {
        return await User.findOne({ userName }).select('-password');
    } catch (error) {
        console.error('Error fetching user by userName:', error.message);
        throw new Error('Failed to fetch user');
    }
};

/**
 * Retrieves all friends of a user if authorized.
 * @param {Object} currentUser - The currently logged-in user.
 * @param {string} targetUserName - The username of the target user.
 * @returns {Array} - A list of friends for the target user.
 * @throws Will throw an error if authorization fails or friends cannot be fetched.
 */
const getAuthorizedFriends = async (currentUser, targetUserName) => {
    try {
        const targetUser = await getUserByUserName(targetUserName);
        if (!targetUser) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        if (
            currentUser.userName !== targetUserName &&
            !currentUser.friends.includes(targetUser._id.toString())
        ) {
            const error = new Error('Not Friends');
            error.status = 403;
            throw error;
        }

        return await getFriends(targetUserName);
    } catch (error) {
        console.error('Error fetching authorized friends:', error.message);
        throw error;
    }
};

/**
 * Retrieves all friends of a user by their username.
 * @param {string} userName - The username of the user.
 * @returns {Array} - A list of user objects representing the friends.
 * @throws Will throw an error if fetching friends fails.
 */
const getFriends = async (userName) => {
    try {
        const user = await getUserByUserName(userName);
        if (!user) return [];
        return await User.find({ _id: { $in: user.friends } }).select('-password');
    } catch (error) {
        console.error('Error fetching friends:', error.message);
        throw new Error('Failed to fetch friends');
    }
};

/**
 * Retrieves friend requests for the given user.
 * @param {Object} user - The user object containing request information.
 * @returns {Array} - A list of user objects representing friend requests.
 * @throws Will throw an error if fetching requests fails.
 */
const getRequests = async (user) => {
    try {
        return await User.find(
            { userName: { $in: user.requestsFriends } },
            { password: 0, posts: 0, friends: 0, requestsFriends: 0 }
        );
    } catch (error) {
        console.error('Error fetching friend requests:', error.message);
        throw new Error('Failed to fetch friend requests');
    }
};



/**
 * Approves a friend request and adds the friend to the user's friend list.
 * @param {Object} user - The user approving the request.
 * @param {string} userNameFriend - The username of the friend to approve.
 * @returns {Object} - The updated user object.
 * @throws Will throw an error if the friend is not found or approval fails.
 */
const approveRequest = async (user, userNameFriend) => {
    try {
        const friend = await User.findOne({ userName: userNameFriend });
        if (!friend) return null;
        if (!user.friends.includes(friend._id)) {
            user.friends.push(friend._id);
            friend.friends.push(user._id);
            user.requestsFriends.pull(userNameFriend);
            await user.save();
            await friend.save();
        }
        return user;
    } catch (error) {
        console.error('Error approving friend request:', error.message);
        throw new Error('Failed to approve friend request');
    }
};


/**
 * Removes a friend from the user's friend / freiend's request list.
 * @param {Object} user - The user performing the removal.
 * @param {string} userFriendName - The username of the friend to remove.
 * @returns {Object} - The updated user object.
 * @throws Will throw an error if the friend is not found or removal fails.
 */
const deleteFriend = async (user, userFriendName) => {
    try {
        const friend = await User.findOne({ userName: userFriendName });
        if (!friend || !user) return null;
        if (user.friends.includes(friend._id)) {
            user.friends.pull(friend._id);
            friend.friends.pull(user._id);
        }
        if (user.requestsFriends.includes(userFriendName)) {
            user.requestsFriends.pull(userFriendName);
        }
        await user.save();
        await friend.save();
        return user;
    } catch (error) {
        console.error('Error deleting friend:', error.message);
        throw new Error('Failed to delete friend');
    }
};

/**
 * Deletes a user and their posts.
 * @param {string} userName - The username of the user to delete.
 * @returns {Object} - The deleted user object.
 * @throws Will throw an error if user deletion fails.
 */
const deleteUser = async (userName) => {
    try {
        const user = await getUserByUserName(userName);
        if (!user) throw new NotFoundError('User not found');
        const posts = getPostsOf(userName);
        if (posts) {
            await Promise.all(posts.map(post => post.deleteOne()));
        }
        
        await user.deleteOne();
        return user;
    } catch (error) {
        console.error('Error deleting user:', error.message);
        throw new DeletionError('Failed to delete user or related posts');
    }
};

/**
 * Removes a post from a user's list of posts.
 * @param {string} id - The ID of the user.
 * @param {string} pid - The ID of the post to remove.
 * @returns {Object} - The updated user object.
 * @throws Will throw an error if the operation fails.
 */
const deletePostInUser = async (userName, pid) => {
    try {
        const user = await getUserByUserName(userName);
        if (!user) return null;
        user.posts.pull(pid);
        await user.save();
        return user;
    } catch (error) {
        console.error('Error in deletePostInUser service:', error.message);
        throw error;
    }
};

/**
 * Updates the user's details and their associated posts.
 * @param {Object} user - The user object to update.
 * @param {string} [firstName] - The new first name of the user (optional).
 * @param {string} [lastName] - The new last name of the user (optional).
 * @param {string} [profilePic] - The new profile picture URL of the user (optional).
 * @returns {Object|null} - The updated user object, or null if the user is not found.
 * @throws Will throw an error if the update operation fails.
 */const updateUser = async (user, firstName, lastName, profilePic) => {
    try {
        if (!user) return null;
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (profilePic) user.profilePic = profilePic;
    // Update related posts (if profilePic or name changes)
    if (firstName || lastName || profilePic) {
        await Article.updateMany(
            { userId: user._id },
            {
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(profilePic && { profilePic }),
            }
        );
    }
        await user.save();
        return user;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw new Error('Failed to update user');
    }
};

/**
 * Retrieves all posts by a user.
 * @param {string} id - The username of the user whose posts are being retrieved.
 * @returns {Array} - A sorted list of posts by the user.
 * @throws Will throw an error if fetching posts fails.
 */const getPostsOf = async (id) => {
    try {
        return await Article.find({ userName: id }).sort({ time: -1 });
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        throw new Error('Failed to fetch posts');
    }
};


/**
 * Sends a friend request from one user to another.
 * @param {string} userName - The username of the user sending the friend request.
 * @param {string} userNameFriend - The username of the user receiving the friend request.
 * @returns {Object|string|null} - The updated user object, 'exist' if the request already exists, or null if a user is not found.
 * @throws Will throw an error if adding the friend request fails.
 */
const addFriendRequest = async (userName, userNameFriend) => {
    try {
        const user = await getUserByUserName(userName);
        const friend = await getUserByUserName(userNameFriend);
        if (!friend ||!user) return null;
        if (user.friends.includes(userNameFriend) || user.requestsFriends.includes(userNameFriend)) {
            return 'exist';
        }
        user.requestsFriends.push(userNameFriend);
        await user.save();
        return user;
    } catch (error) {
        console.error('Error adding friend request:', error.message);
        throw new Error('Failed to add friend request');
    }
};

module.exports = {
    createUser, getUserByUserName, getAuthorizedFriends, getRequests, approveRequest, deleteFriend,
    deleteUser, updateUser, getPostsOf, addFriendRequest, deletePostInUser,
};
