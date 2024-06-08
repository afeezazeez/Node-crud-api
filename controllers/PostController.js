const postService = require('../services/postService');
const { sendSuccessResponse } = require('../utils/responseHelper');
const ClientErrorException = require('../exceptions/ClientErrorException');
const ValidationErrorException = require('../exceptions/ValidationException');

async function store(req, res, next) {
    try {
        const result = await postService.createPost(req.body);
        return sendSuccessResponse(res, result, "Post created", 201);
    } catch (error) {
        return next(error);
    }
}

async function show(req, res, next) {
    const id = req.params.id;
    try {
        const result = await postService.getPostById(id);
        return sendSuccessResponse(res, result);
    } catch (error) {
        return next(error);
    }
}

async function index(req, res, next) {
    try {
        const result = await postService.getAllPosts();
        return sendSuccessResponse(res, result);
    } catch (error) {
        return next(error);
    }
}

async function update(req, res, next) {
    const id = req.params.id;
    const userId = 1
    try {
        const result = await postService.updatePost(id, userId, req.body);
        return sendSuccessResponse(res, result, "Post updated");
    } catch (error) {
        return next(error);
    }
}

async function destroy(req, res, next) {
    const id = req.params.id;
    const userId = 1; 
    try {
        await postService.deletePost(id, userId);
        return sendSuccessResponse(res, null, "Post deleted");
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    store,
    show,
    index,
    update,
    destroy
};
