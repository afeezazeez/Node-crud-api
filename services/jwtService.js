const jwt = require('jsonwebtoken');
require('dotenv').config();
const redisClient = require('../config/redisClient');
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

function addTokenToBlacklist(token, expiryTime) {
 
    if (typeof expiryTime !== 'number') {
        console.error('Invalid expiryTime. It should be a number.');
        return;
    }

    if (typeof token !== 'string') {
        console.error('Invalid token. It should be a string.');
        return;
    }

    redisClient.set(token, 'true', 'EX', expiryTime)
        .then(() => {
            console.log('Token added to blacklist successfully');
        })
        .catch((err) => {
            console.error('Error adding token to blacklist:', err);
        });
}


function isTokenBlacklisted(token, callback) {
    redisClient.get(token, (err, result) => {
        if (err) {
            console.error('Error checking blacklist:', err);
            callback(err, false); // Ensure the callback is always called, even in case of an error
        } else {
            console.log("Is it blacklisted? =", result === 'true');
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