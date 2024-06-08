const jwt = require('jsonwebtoken');

function isAuthenticated(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token,"secret")
    } catch (error) {
        
    }
}