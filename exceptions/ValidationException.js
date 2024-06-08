class ValidationException extends Error {
    constructor(errors, message = 'Validation failed', statusCode = 422) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

module.exports = ValidationException;
