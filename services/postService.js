const models = require('../models');
const ClientErrorException = require('../exceptions/ClientErrorException');
const ValidationErrorException = require('../exceptions/ValidationException');
const { validate } = require('../utils/validationHelper');

async function createPost(postData) {
    
    return models.Post.create(postData);
}

async function getPostById(id) {
    const post = await models.Post.findOne({ where: { id: id} });
    
    if (!post) {
        throw new ClientErrorException("Post not found", 404);
    }
    return models.Post.findByPk(id);
}

async function getAllPosts() {
    return models.Post.findAll();
}

async function updatePost(id, userId, updatedData) {
  
    const post = await models.Post.findOne({ where: { id: id, userId: userId } });
    
    if (!post) {
        throw new ClientErrorException("Post not found", 404);
    }
    
    models.Post.update(updatedData, { where: { id: id, userId: userId } });

    return updatedData;
}

async function deletePost(id, userId) {
    const post = await models.Post.findOne({ where: { id: id, userId: userId } });
    if (!post) {
        throw new ClientErrorException("Post not found", 404);
    }
    return models.Post.destroy({ where: { id: id, userId: userId } });
}

module.exports = {
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost
};
