const { verifyToken, isTokenBlacklisted } = require('../services/jwtService');
const AuthenticationException = require('../exceptions/AuthenticationException');

function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        isTokenBlacklisted(token, (err, blacklisted) => {
            if (err || blacklisted) {
                return next(new AuthenticationException());
            }
            
            const decodedToken = verifyToken(token);
            req.userData = decodedToken;
            next();
        });
    } catch (error) {
        next(new AuthenticationException());
    }    
}

module.exports = {
    authenticate
};
