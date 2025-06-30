const { ApiErr } = require('../utils/apiErr');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiErr) {
        return res.status(err.statusCode).json({
            status: 'error',
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors,
            stack: err.stack,
    });
}
return res.status(500).json({
    message: 'Internal Server Error',
    error: err.message || err,
});
};

module.exports = errorHandler;