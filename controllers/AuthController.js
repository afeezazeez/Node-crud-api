const authService = require('../services/authService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');

async function register(req, res, next) {
    try {
        const user = await authService.registerUser(req.body);
        return sendSuccessResponse(res, user, "Registration successful", 201);
    } catch (error) {
        return next(error);
    }
}

async function login(req, res, next) {
    try {
        const token = await authService.loginUser(req.body);
        return sendSuccessResponse(res, token, "Login successful", 200);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    register,
    login
};
