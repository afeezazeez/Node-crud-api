const models =  require('../models');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');


function store(req,res){
   const post = {
       title:req.body.title,
       content:req.body.content,
       imageUrl:req.body.imageUrl,
       categoryId:req.body.categoryId,
       userId:req.body.userId
   }
   models.Post.create(post)
            .then(result=>{
                sendSuccessResponse(res, result, "Post created", 201);
            }).catch(error=>{
                sendErrorResponse(res, error, "Failed to create post");
            });
}

function show(req,res){
    const id =  req.params.id
    models.Post.findByPk(id).then(result=>{
        if(result){
            sendSuccessResponse(res, result);
        }else{
            sendErrorResponse(res,null,"Post not found",404)
        }
    }).catch(error=>{
        sendErrorResponse(res, error, "Failed to fetch post");
    });
}

function index(req,res){
    models.Post.findAll().then(result=>{
        sendSuccessResponse(res, result);
    }).catch(error=>{
        sendErrorResponse(res, error, "Failed to fetch all post");
    });
}

function update(req,res){
    const id =  req.params.id
    const updatedPost = {
        title:req.body.title,
       content:req.body.content,
       imageUrl:req.body.imageUrl,
       categoryId:req.body.categoryId,
    }
    const userId = 1;
   
    models.Post.findOne({ where: { id: id, userId: userId } })
        .then(post => {
            if (!post) {
                return sendErrorResponse(res, null, "Post not found", 404);
            }
            models.Post.update(updatedPost, { where: { id: id, userId: userId } })
                .then(result => {
                    sendSuccessResponse(res, updatedPost, "Post updated!");
                })
                .catch(error => {
                    sendErrorResponse(res, error, "Failed to update post");
                });
        })
        .catch(error => {
            sendErrorResponse(res, error, "Error finding post",404);
        });
}

function destroy(req,res){
    const id =  req.params.id
    const userId = 1;

    models.Post.findOne({ where: { id: id, userId: userId } })
        .then(post => {
            if (!post) {
                return sendErrorResponse(res, null, "Post not found", 404);
            }

          models.Post.destroy({ where: { id: id, userId: userId } })
                .then(result => {
                    sendSuccessResponse(res, null, "Post deleted");
                })
                .catch(error => {
                    sendErrorResponse(res, error, "Failed to delete post");
                });
        })
        .catch(error => {
            sendErrorResponse(res, error, "Error finding post",404);
        });
}

module.exports = {
    store:store,
    show:show,
    index:index,
    update:update,
    destroy:destroy
}