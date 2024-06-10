const models = require('../models');
const ClientErrorException = require('../exceptions/ClientErrorException');
const { Op } = require('sequelize');

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

async function getAllPosts(query, pageSize, page) {
    
    const offset = (page - 1) * pageSize;

    const whereClause = query
        ? {
              [Op.or]: [
                  { title: { [Op.like]: `%${query}%` } },
                  { content: { [Op.like]: `%${query}%` } }
              ]
          }
        : {};

    const { count, rows } = await models.Post.findAndCountAll({
        where: whereClause,
        order: [['createdAt', 'DESC']],
        limit: pageSize,
        offset: offset
    });

    const totalPages = Math.ceil(count / pageSize);
    const nextPage = page < totalPages ? page + 1 : null;

    return {
        data: rows,
        total: count,
        total_pages: totalPages,
        current_page: page,
        page_size: pageSize,
        next_page: nextPage
    };
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
