const models = require('../models');
const ClientErrorException  = require('../exceptions/ClientErrorException')
const ValidationErrorException  = require('../exceptions/ValidationException')
const { validate } = require('../utils/validationHelper');
const { hashPassword, check } = require('../utils/bcrypt');
const { generateToken } = require('./jwtService');

async function registerUser(userData) {
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

    const { isValid, errors } = validate(userData, schema);

    if (!isValid) {
        throw new ValidationErrorException(errors);
    }

    const existingUser = await models.User.findOne({ where: { email: userData.email } });
    if (existingUser) {
        throw new ClientErrorException("Email is already associated with a user", 409);
    }

    const hashedPassword =  hashPassword(userData.password);
    userData.password = hashedPassword;

    const newUser = await models.User.create(userData);
    const { password, ...userWithoutPassword } = newUser.dataValues;

    return userWithoutPassword;
}

async function loginUser(credentials) {
    const schema = {
        email: { type: "email", optional: false },
        password: { type: "string", optional: false }
    };
   
    const { isValid, errors } = validate(credentials, schema);

    if (!isValid) {
        throw new ValidationErrorException(errors);
    }
 
    const user = await models.User.findOne({ where: { email: credentials.email } });

    if (!user) {
        throw new ClientErrorException("Email is not associated with any user", 401);
    }

    if (!check(credentials.password, user.password)) {
        throw new ClientErrorException("Incorrect password!", 401);
    }

    const token = generateToken({ email: user.email, userId: user.id });

    return { token };
}

module.exports = {
    registerUser,
    loginUser
};