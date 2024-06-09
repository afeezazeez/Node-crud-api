const authService = require('../services/authService');
const { sendSuccessResponse } = require('../utils/responseHelper');
const { validate } = require('../utils/validationHelper');
const ValidationErrorException  = require('../exceptions/ValidationException')

async function register(req, res, next) {
    try {
        const schema = {
            name: { type: "string", optional: false },
            email: { type: "email", optional: false },
            password: { 
                type: "string", 
                min: 8, 
                max: 16, 
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, 
                messages: {
                    stringMin: "Password must be at least 8 characters long",
                    stringMax: "Password cannot exceed 16 characters",
                    stringPattern: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
                }
            }
        };
    
        const { isValid, errors } = validate(req.body, schema);
    
        if (!isValid) {
            throw new ValidationErrorException(errors);
        }

        const user = await authService.registerUser(req.body);

        return sendSuccessResponse(res, user, "Registration successful", 201);

    } catch (error) {

        return next(error);
    }
}

async function login(req, res, next) {

    try {
    
        const schema = {
            email: { type: "email", optional: false },
            password: { type: "string", optional: false }
        };
       
        const { isValid, errors } = validate(req.body, schema);
    
        if (!isValid) {
            throw new ValidationErrorException(errors);
        }
        
        const token = await authService.loginUser(req.body);
        
        return sendSuccessResponse(res, token, "Login successful");

    } catch (error) {

        return next(error);
    }
}

async function logout(req, res, next) {

    try {

        const token = req.headers.authorization.split(" ")[1];
        await authService.logoutUser(token);
        return sendSuccessResponse(res, null, "Logout successful", 200);
    
    } catch (error) {

        return next(error);
    }
}

module.exports = {
    register,
    login,
    logout
};
