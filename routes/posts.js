const express =  require('express');
const  router =  express.Router();
const PostController =  require('../controllers/PostController');
const {authenticate} = require('../middleware/auth')

router.get("",PostController.index);
router.post("",authenticate,PostController.store);
router.get("/:id",PostController.show)
router.patch("/:id",authenticate,PostController.update)
router.delete("/:id",authenticate,PostController.destroy)

module.exports = router;