const models = require('../models');
const ClientErrorException = require('../exceptions/ClientErrorException');
const { Op } = require('sequelize');
const {getPaginationData} = require('../utils/helper')


async function createPost(postData) {

    return models.Post.create(postData);
}

async function getPostById(id) {

    const post =  await models.Post.findOne({
        where: { id: id },
        include: [models.User,models.Category]
      });
        
    if (!post) {
        throw new ClientErrorException("Post not found", 404);
    }
    return post;
}

async function getPostCategoryById(id) {
    const category = await models.Category.findOne({ where: { id: id} });
    
    if (!category) {
        throw new ClientErrorException("Category not found", 404);
    }
    return category;
}

async function getAllPosts(query, pageSize, page) {
    
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
        order: [['created_at', 'DESC']],
        limit: pageSize,
        offset: (page - 1) * pageSize,
        include: [models.User,models.Category]
    });

    const paginationData = getPaginationData(count, pageSize, page);

    return {
        data: rows,
        ...paginationData
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
    deletePost,
    getPostCategoryById
};
