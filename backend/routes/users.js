// JavaScript source code
const usersController = require('../controllers/users');
const articlesController = require('../controllers/article');
const express = require('express');
const loginController = require('../controllers/login');
var router = express.Router();

router.route('/')
  .post(usersController.createUser);
router.route('/:id')
    .get(loginController.isLoggedIn,usersController.getUser)
    .patch(loginController.isLoggedIn, usersController.updateUser)
    .delete(loginController.isLoggedIn, usersController.deleteUser);
router.route('/:id/posts')
    .post(loginController.isLoggedIn,articlesController.createArticle)
    .get(loginController.isLoggedIn,usersController.getPostsOf)
router.route('/:id/posts/:pid')
    .delete(loginController.isLoggedIn,articlesController.deleteArticle) 
    .patch(loginController.isLoggedIn,articlesController.updateArticle)
router.route('/:id/friends')
    .get(loginController.isLoggedIn,usersController.getFriends)
    .post(loginController.isLoggedIn,usersController.newFriendRequest);
router.route('/:id/friends/:fid')
    .patch(loginController.isLoggedIn,usersController.approveRequest)
    .delete(loginController.isLoggedIn,usersController.deleteFriend);
router.route('/:id/friendsRequest')
    .get(loginController.isLoggedIn, usersController.getRequests);
module.exports = router; 
 