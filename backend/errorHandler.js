const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack || err.message || err);

    if (err.status) {
        return res.status(err.status).json({ errors: [err.message] });
    }

    res.status(500).json({ errors: ['Internal Server Error'] });
};
module.exports = errorHandler;
