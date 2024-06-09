class AuthenticationException extends Error {
    constructor(message = 'Authentication failed', statusCode = 401) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = AuthenticationException;
