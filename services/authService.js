const models = require('../models');
const ClientErrorException  = require('../exceptions/ClientErrorException')
const { hashPassword, check } = require('../utils/bcrypt');
const { generateToken } = require('./jwtService');

async function registerUser(userData) {
   
    const existingUser = await models.User.findOne({ where: { email: userData.email } });
  
    if (existingUser) {
        throw new ClientErrorException("Email is already associated with a user", 409);
    }

    userData.password =hashPassword(userData.password);

    const newUser = await models.User.create(userData);
    
    const { password, ...userWithoutPassword } = newUser.dataValues;

    return userWithoutPassword;
}

async function loginUser(credentials) {
 
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
