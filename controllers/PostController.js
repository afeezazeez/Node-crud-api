const Validator = require('fastest-validator');
const models = require('../models');
const { sendSuccessResponse } = require('../utils/responseHelper');
const ClientErrorException  = require('../exceptions/ClientErrorException')
const ValidationErrorException  = require('../exceptions/ValidationException')
const { validate } = require('../utils/validationHelper');


async function store(req, res,next) {
    const requestData = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: req.body.userId
    };

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "500" },
        categoryId: { type: "number", optional: false }
    };

    const { isValid, errors } = validate(requestData, schema);

    if (!isValid) {
        return next(new ValidationErrorException(errors));
    }

    try {
        const result = await models.Post.create(requestData);
        return sendSuccessResponse(res, result, "Post created", 201);
    } catch (error) {
        return next(new ClientErrorException("Failed to create post"));
    }
}

async function show(req, res,next) {
    const id = req.params.id;

    try {
        const result = await models.Post.findByPk(id);
        if (result) {
            return sendSuccessResponse(res, result);
        } else {
            return next(new ClientErrorException("Post not found", 404));
        }
    } catch (error) {
        return next(new ClientErrorException("Failed to fetch post"));
    }
}

async function index(req, res,next) {
    try {
        const result = await models.Post.findAll();
        return sendSuccessResponse(res, result);
    } catch (error) {
        return next(new ClientErrorException("Failed to fetch all posts"));  
    }
}

async function update(req, res,next) {
    
    const id = req.params.id;
   
    const requestData = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
    };

    const userId = 1;

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "500" },
        categoryId: { type: "number", optional: false }
    };

    const { isValid, errors } = validate(requestData, schema);

    if (!isValid) {
        return next(new ValidationErrorException(errors));
    }

    try {

        const post = await models.Post.findOne({ where: { id: id, userId: userId } });
       
        if (!post) {
            return next(new ClientErrorException( "Post not found", 404));
        }

        await models.Post.update(requestData, { where: { id: id, userId: userId } });
        
        return sendSuccessResponse(res, requestData, "Post updated!");

    } catch (error) {
        return next(new ClientErrorException("Failed to update post"));
    }
}

async function destroy(req, res,next) {
    const id = req.params.id;
    const userId = 1;

    try {
        const post = await models.Post.findOne({ where: { id: id, userId: userId } });
        if (!post) {
            return next(new ClientErrorException( "Post not found", 404));
        }

        await models.Post.destroy({ where: { id: id, userId: userId } });
        return sendSuccessResponse(res, null, "Post deleted");
    } catch (error) {
        return next(new ClientErrorException("Failed to delete post"));
    }
}

module.exports = {
    store,
    show,
    index,
    update,
    destroy
};
