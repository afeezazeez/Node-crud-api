const { sendErrorResponse } = require('../utils/responseHelper');
const ClientErrorException = require('../exceptions/ClientErrorException'); 
const ValidationErrorException = require('../exceptions/ValidationException'); 
const AuthenticationException = require('../exceptions/AuthenticationException'); 
const logger = require('../utils/logger');


function errorHandler(err, req, res, next) {
    if (err instanceof ClientErrorException) {
        return sendErrorResponse(res, null, err.message, err.statusCode);
    }

    if(err instanceof ValidationErrorException){
        return sendErrorResponse(res, err.errors, err.errors[0].message, err.statusCode);
    }

    if(err instanceof AuthenticationException){
        return sendErrorResponse(res, null, err.message, err.statusCode);
    }

    logger.error(err);

    return sendErrorResponse(res, null, 'Internal Server Error', 500);
}

module.exports = errorHandler;
