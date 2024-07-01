const postService = require('../services/postService');
const fileService = require('../services/fileService');
const { sendSuccessResponse } = require('../utils/responseHelper');
const { validate } = require('../utils/validationHelper');
const ValidationErrorException  = require('../exceptions/ValidationException')
const ClientErrorException  = require('../exceptions/ClientErrorException')
const PostTransformer = require('../transformers/postTransformer')

async function index(req, res, next) {
    try {
        const query = req.query.q;
        const pageSize = parseInt(process.env.PAGE_SIZE);
        const page = parseInt(req.query.page) || 1;

        const result = await postService.getAllPosts(query, pageSize, page);
    
        return sendSuccessResponse(res, {...result,data: PostTransformer.collection(result.data)});
    
    } catch (error) {
    
        return next(error);
    
    }
}

async function show(req, res, next) {
    const id = req.params.id;
    try {
        const result = await postService.getPostById(id);
        return sendSuccessResponse(res, PostTransformer.make(result));
    } catch (error) {
        return next(error);
    }
}


async function store(req, res, next) {
    try {
        const schema = {
            title: { type: "string", optional: false },
            content: { type: "string", optional: false },
            category_id: { type: "number", optional: false }
        };

        const requestBody = {
            ...req.body,
            category_id: Number(req.body.category_id)
        };

        const { isValid, errors } = validate(requestBody, schema);

        if (!isValid) {
            throw new ValidationErrorException(errors);
        }

        if (!req.file) {
            throw new ClientErrorException('The file field is required');
        }

        const category = await postService.getPostCategoryById(requestBody.category_id);

        const imageUpload = await fileService.uploadFile(req.file.buffer, 'posts');

        const result = await postService.createPost({
            ...requestBody,
            category_id: category.id,
            user_id: req.userData.userId,
            image: imageUpload.url
        });

        return sendSuccessResponse(res, PostTransformer.make(result), "Post created", 201);

    } catch (error) {
        return next(error);
    }
}


async function update(req, res, next) {
    
try {

      const schema = {
            title: { type: "string", optional: false },
            content: { type: "string", optional: false },
        };
    
        const { isValid, errors } = validate(req.body, schema);
    
        if (!isValid) {
            throw new ValidationErrorException(errors);
        }

        const result = await postService.updatePost(req.params.id, req.body);

        return sendSuccessResponse(res, PostTransformer.make(result), "Post updated");
        
    } catch (error) {
        return next(error);
    }
}

async function destroy(req, res, next) {
    try {
        await postService.deletePost(req.params.id);
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
