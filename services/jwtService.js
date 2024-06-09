const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthenticationException = require('../exceptions/AuthenticationException')

const secret = process.env.JWT_SECRET || 'default_secret_key';

function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1hr' });
}

function verifyToken(token) {
    
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new AuthenticationException();
    }
}

module.exports = {
    generateToken,
    verifyToken
};