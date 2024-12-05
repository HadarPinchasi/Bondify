// JavaScript source code
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    photo:{
        type: String,
    },
    profilePic: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now,
    }
    

});
module.exports = mongoose.model('Article', Article);
