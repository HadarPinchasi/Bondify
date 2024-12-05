// JavaScript source code 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const articles = require('./routes/article');
const users = require('./routes/users');
const login = require('./routes/login');
const errorHandler = require('./errorHandler');
require('custom-env').env(process.env.NODE_ENV, './config');

mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
var app = express();
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '300mb' }));
app.use(express.urlencoded({ limit: '300mb', extended: true }));
app.use('/api/articles', articles);
app.use('/api/users', users);
app.use('/api/tokens', login);
const path = require('path');

// Serve the React application's index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.use(errorHandler);

app.listen(process.env.PORT);
