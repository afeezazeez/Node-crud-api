function sendSuccessResponse(res, data = null, message = null, statusCode = 200) {
    const response = {
        success: true,
    };

    if (message) {
        response.message = message;
    }

    if (data) {
        response.data = data;
    }

    res.status(statusCode).json(response);
}

function sendErrorResponse(res, error = null, message = null, statusCode = 500) {
    const response = {
        success: false,
    };

    if (message) {
        response.message = message;
    }

    if (error) {
        response.errors = error;
    }

    res.status(statusCode).json(response);
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
};
