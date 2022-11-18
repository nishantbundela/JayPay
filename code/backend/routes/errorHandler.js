/**
 * Responds with an error.
 *
 * @param res: the response callback.
 * @param status: the error code of the error.
 * @param error: the error message.
 */
function errorHandler(res, status, error, code) {
    res.status(status).json({
        errors: [
            {
                status: status,
                detail: error.message || error,
                code: code
            },
        ],
    });
}

module.exports = errorHandler;