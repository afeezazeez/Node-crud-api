const models = require('../models');
const { hashPassword,check } = require('../utils/bcrypt');
const { sendSuccessResponse } = require('../utils/responseHelper');
const { validate } = require('../utils/validationHelper');
const ClientErrorException  = require('../exceptions/ClientErrorException')
const ValidationErrorException  = require('../exceptions/ValidationException')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 



async function register(req, res, next) {
   
    const requestData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

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
    

    const { isValid, errors } = validate(requestData, schema);

    if (!isValid) {
        return next(new ValidationErrorException(errors));
    }

    try {
        const user = await models.User.findOne({ where: { email: requestData.email } });

        if (user) {
            return next(new ClientErrorException("Email is already associated with a user",409));
        }
            
        requestData.password = hashPassword(requestData.password);

        const result = await models.User.create(requestData);

        const { password, ...userWithoutPassword } = result.dataValues;

        return sendSuccessResponse(res, userWithoutPassword, "Registration successful", 201);

    } catch (error) {
       
        return next(new ClientErrorException("Failed to register user")); 
    }
}

async function login(req, res,next) {
  
    const requestData = {
        email: req.body.email,
        password: req.body.password
    };

    const schema = {
        email: { type: "email", optional: false },
        password: { type: "string", optional: false }
    };

    const { isValid, errors } = validate(requestData, schema);

    if (!isValid) {
        return next(new ValidationErrorException(errors));
    }
   
    try {

        const user = await models.User.findOne({ where: { email: requestData.email } });
        
        if (!user) {
            return next(new ClientErrorException("Email is not associated with any user",401));
        }

       if(!check(requestData.password, user.password)){
            return next(new ClientErrorException("Incorrect password!", 401));
       }
        
            const token = jwt.sign({
                email: user.email,
                userId: user.id
            }, 'secret');

            return sendSuccessResponse(res, { token }, "Login successful", 200);
      
    } catch (error) {
         return next(new ClientErrorException(error));
    }
}

module.exports = {
    register,
    login
};
