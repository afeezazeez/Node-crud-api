const express =  require('express');
const  router =  express.Router();
const PostController =  require('../controllers/PostController');

router.get("",PostController.index);
router.post("",PostController.store);
router.get("/:id",PostController.show)
router.patch("/:id",PostController.update)
router.delete("/:id",PostController.destroy)

module.exports = router;