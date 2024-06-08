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
        sendSuccessResponse(res, result);
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
   
    models.Post.update(updatedPost,{where:{id:id,userId:userId}}).then(result=>{
        sendSuccessResponse(res, updatedPost,"Post updated!");
    }).catch(error=>{
        sendErrorResponse(res, error, "Failed to update post");
    });
}

function destroy(req,res){
    const id =  req.params.id
    const userId = 1;

    models.Post.destroy({where:{id:id,userId:userId}}).then(result=>{
        sendSuccessResponse(res);
    }).catch(error=>{
        sendErrorResponse(res, error, "Failed to delete post");
    });
}

module.exports = {
    store:store,
    show:show,
    index:index,
    update:update,
    destroy:destroy
}