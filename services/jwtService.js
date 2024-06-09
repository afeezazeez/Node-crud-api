const jwt = require('jsonwebtoken');
require('dotenv').config();
const redisClient = require('../config/redisClient');
const AuthenticationException = require('../exceptions/AuthenticationException')
const logger = require('../utils/logger');
const secret = process.env.JWT_SECRET || 'default_secret_key';

function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1m' });
}

function verifyToken(token) {
    
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

function addTokenToBlacklist(token, expiryTime) {
 
    if (typeof expiryTime !== 'number') {
        return;
    }

    if (typeof token !== 'string') {
        return;
    }

    redisClient.set(token, 'true', 'EX', expiryTime)
        .then(() => {
        })
        .catch((err) => {
        });
}


function isTokenBlacklisted(token, callback) {
    redisClient.get(token, (err, result) => {
        if (err) {
            callback(err, false); 
        } else {
            callback(null, result === 'true');
        }
    });
}


module.exports = {
    generateToken,
    verifyToken,
    addTokenToBlacklist,
    isTokenBlacklisted
};