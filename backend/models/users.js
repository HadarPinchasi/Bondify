// JavaScript source code
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
     friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    requestsFriends: [{
        type: String
    }]
});
module.exports = mongoose.model('User', User);
