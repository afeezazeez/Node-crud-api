const models =  require('../models');

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
               res.status(201).json({
                   message:"Post created",
                   post:result
               }) 
            }).catch(error=>{
                res.status(500).json({
                    message:"Failed",
                    error:error
                }) 
            });
}

module.exports = {
    store:store
}