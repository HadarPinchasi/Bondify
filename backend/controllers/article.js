// JavaScript source code
const articleService = require('../services/article');
const userService = require('../services/users');

//being used -id=username
/**
 * Creates a new article.
 * Validates user existence, content, and links, and creates the article if valid.
 * Updates the user's post list with the new article's ID.
 * @param {Object} req - The request object containing article details: firstName, lastName, content, userId, userName, photo.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const createArticle = async (req, res, next) => {
    try {

        const { firstName, lastName, content, userId, userName, photo } = req.body;
        const user = await userService.getUserByUserName(userName);
        const newArticle = await articleService.createArticle(firstName, lastName, content, userId, userName, photo, user.profilePic);
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        if (!newArticle) {
            const error = new Error('Link is invalid');
            error.status = 409;
            throw error;
        } else {
            user.posts.push(newArticle._id);
            await user.save();
            res.status(201).json({ article: newArticle });
        }
    } catch (error) {
        next(error);
    }
}
/**
 * Updates an article by ID.
 * Validates the provided content and photo, and updates the article if valid.
 * @param {Object} req - The request object containing the article ID (req.params.pid), content (req.body.content), and photo (req.body.photo).
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const updateArticle = async (req, res, next) => {
    try {
        const article = await articleService.updateArticle(req.params.pid, req.body.content, req.body.photo);
        if (!article) {
            const error = new Error('Link is invalid');
            error.status = 409;
            throw error;
        } else {
            res.status(201).json({ article: article });
        }
    }
    catch (error) {
        next(error);
    }
};


//V
/**
 * Deletes an article by ID.
 * Removes the article from the database and returns the deleted article.
 * @param {Object} req - The request object containing the article ID (req.params.pid).
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const deleteArticle = async (req, res, next) => {
    try {
        const article = await articleService.deleteArticle(req.params.pid);
        if (!article) {
            const error = new Error('Article not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves the feed of articles for the logged-in user.
 * Fetches posts from the user's friends and non-friends.
 * @param {Object} req - The request object, containing the logged-in user (req.user).
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getArticles = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            const error = new Error('Unauthorized');
            error.status = 401;
            throw error;
        }
        const friends = user.friends;
        const feedPosts = await articleService.getFeedPosts(user._id, friends);
        res.status(200).json(feedPosts);
    } catch (error) {
        next(error);
    }
};


module.exports = { createArticle, getArticles, updateArticle, deleteArticle };

