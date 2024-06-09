const postService = require('../services/postService');
const { sendSuccessResponse } = require('../utils/responseHelper');
const { validate } = require('../utils/validationHelper');
const ValidationErrorException  = require('../exceptions/ValidationException')

async function store(req, res, next) {
    try {
        const schema = {
            title: { type: "string", optional: false },
            content: { type: "string", optional: false },
            imageUrl: { type: "string", optional: false },
            categoryId:{ type: "number", optional: false },
        };
    
        const { isValid, errors } = validate(req.body, schema);
    
        if (!isValid) {
            throw new ValidationErrorException(errors);
        }
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

        const schema = {
            title: { type: "string", optional: false },
            content: { type: "string", optional: false },
            imageUrl: { type: "string", optional: false },
            categoryId:{ type: "number", optional: false },
        };
    
        const { isValid, errors } = validate(req.body, schema);
    
        if (!isValid) {
            throw new ValidationErrorException(errors);
        }

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
