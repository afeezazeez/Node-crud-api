const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET_KEY || 'default_secret_key';

function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};