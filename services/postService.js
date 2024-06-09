const models = require('../models');
const ClientErrorException = require('../exceptions/ClientErrorException');

async function createPost(postData) {
    return models.Post.create(postData);
}

async function getPostById(id) {
    const post = await models.Post.findOne({ where: { id: id} });
    
    if (!post) {
        throw new ClientErrorException("Post not found", 404);
    }
    return post;
}

async function getAllPosts() {
    return models.Post.findAll();
}

async function updatePost(id, updatedData) {
  
    const post = await models.Post.findOne({ where: { id: id} });
    
    if (!post) {
        throw new ClientErrorException("Post not found", 404);
    }
    
    await post.update(updatedData);

    return post;
}

async function deletePost(id) {
    const post = await models.Post.findOne({ where: { id: id} });
    if (!post) {
        throw new ClientErrorException("Post not found", 404);
    }
    await post.destroy();

    return;

}

module.exports = {
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost
};
