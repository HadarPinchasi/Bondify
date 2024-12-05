const net = require('net');
const Article = require('../models/article');
const userServices = require('../services/users');
const User = require('../models/users');

let isConnectedToCpp = false;

const BLOOM_SERVER_CONFIG = { port: 5555, host: '127.0.0.1' };
const URLS_TO_INIT = [
    "https://bla1",
    "https://bla2",
    "https://bla3",
    "https://bla4",
    "https://bla5"
];

/**
 * Creates a connection to the C++ server and sends a command.
 * @param {string} command - The command to send to the C++ server.
 * @returns {Promise<string>} - Resolves with the server response.
 */
const connectToCppServer = (command) => {
    return new Promise((resolve, reject) => {
        const client = net.createConnection(BLOOM_SERVER_CONFIG, () => {
            client.write(command);
        });

        client.on('data', (data) => {
            client.end();
            resolve(data.toString());
        });

        client.on('error', reject);
    });
};


/**
 * Initializes the Bloom filter on the C++ server.
 * If not already connected, establishes the connection and adds predefined URLs.
 */
const initializeBloomFilter = async () => {
    if (!isConnectedToCpp) {
        await connectToCppServer("8 2");
        isConnectedToCpp = true;

        for (const url of URLS_TO_INIT) {
            await connectToCppServer(`1 ${url}`);
        }
    }
};


/**
 * Sends a URL to the C++ server for validation.
 * @param {string} url - The URL to send.
 * @returns {Promise<string>} - The response from the C++ server.
 */
const sendUrlToCppServer = async (url) => {
    await initializeBloomFilter();
    const response = await connectToCppServer(url);
    console.log(response);
    return response;
};

/**
 * Extracts all links from a given content string.
 * @param {string} content - The content to search for links.
 * @returns {string[]} - An array of URLs found in the content.
 */
const extractLinksFromContent = (content) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    return content.match(linkRegex) || [];
};
/**
 * Handles validation of links by sending them to the C++ server.
 * @param {string[]} links - An array of links to validate.
 * @returns {Promise<string|null>} - Returns a response if a valid link is found, otherwise null.
 */
const handleLinks = async (links) => {
    links = links.map(link => link.trim());
    console.log("Found links in the new article:", links);
    for (const link of links) {
        const isValid = await sendUrlToCppServer(`2 ${link}`);
        if (isValid) {
            return isValid;
        }
    }
}
/**
 * Creates a new article and saves it to the database.
 * If the content contains links, validates them before saving.
 * @param {string} firstName - Author's first name.
 * @param {string} lastName - Author's last name.
 * @param {string} content - Article content.
 * @param {string} userId - Author's user ID.
 * @param {string} userName - Author's username.
 * @param {string} photo - Article photo URL.
 * @param {string} profilePic - Author's profile picture URL.
 * @param {Date} time - Article creation time.
 * @returns {Promise<Object|null>} - The saved article object or null if validation fails.
 */
const createArticle = async (firstName, lastName, content, userId, userName, photo, profilePic, time) => {
    let links = extractLinksFromContent(content);
    if (links.length > 0) {
        isValid = await handleLinks(links);
        if (isValid) {
            return null;
        }
    }
    const article = new Article({
        firstName, lastName, content, userId, userName, photo, profilePic, time,
    });
    return await article.save();

}
/**
 * Updates an existing article by ID.
 * If the new content contains links, validates them before saving.
 * @param {string} pid - Article ID.
 * @param {string} content - New article content.
 * @param {string} photo - New article photo URL.
 * @returns {Promise<Object|null>} - The updated article or null if validation fails.
 */
const updateArticle = async (pid, content, photo) => {
    const article = await getArticleById(pid);
    if (!article) return null;
    let links = extractLinksFromContent(content);
    if (links.length > 0) {
        isValid = await handleLinks(links);
        if (isValid) {
            return null;
        }
    }
    if (content) article.content = content;
    if (photo) article.photo = photo;
    await article.save();
    return article;
};


/**
 * Retrieves an article by its ID.
 * @param {string} id - Article ID.
 * @returns {Promise<Object|null>} - The article object or null if not found.
 */
const getArticleById = async (id) => { return await Article.findById(id); };

/**
 * Retrieves all articles from the database.
 * @returns {Promise<Object[]>} - An array of all articles.
 */
const getArticles = async () => { return await Article.find({}); };


/**
 * Fetches feed posts for a user, including posts from friends and non-friends.
 * @param {string} userId - The user's ID.
 * @param {string[]} friends - Array of friend IDs.
 * @param {number} limit - Limit on the number of friend posts to retrieve.
 * @returns {Promise<Object[]>} - An array of feed posts.
 */
const getFeedPosts = async (userId, friends, limit) => {
    try {
        const friendsPosts = await Article.find({ userId: { $in: friends } }).sort({ time: -1 }).limit(limit);

        const nonFriendsPosts = await Article.find({ userId: { $nin: friends } }).sort({ time: -1 }).limit(5);

        return [...friendsPosts, ...nonFriendsPosts];
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
};

/**
 * Deletes an article by ID and removes its reference from the associated user.
 * @param {string} id - Article ID.
 * @returns {Promise<Object|null>} - The deleted article or null if not found.
 */
const deleteArticle = async (id) => {
    try {
        const article = await getArticleById(id);
        if (!article) return null;
        const user = await userServices.deletePostInUser(article.userName, id);
        if (!user) {
            throw new Error('User not found while deleting post in user');
        }
        await article.deleteOne();
        return article;
    } catch (error) {
        console.error('Error in deleteArticle service:', error.message);
        throw error;
    }
};

module.exports = { createArticle, getArticleById, getArticles, updateArticle, deleteArticle, getFeedPosts }
