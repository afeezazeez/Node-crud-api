class ClientErrorException extends Error {
    constructor(message = 'Client Error', statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ClientErrorException;
