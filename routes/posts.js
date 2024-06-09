const express =  require('express');
const  router =  express.Router();
const PostController =  require('../controllers/PostController');
const authMiddleware = require('../middleware/auth')

router.get("",PostController.index);
router.post("",authMiddleware.authenticate,PostController.store);
router.get("/:id",PostController.show)
router.patch("/:id",authMiddleware.authenticate,PostController.update)
router.delete("/:id",authMiddleware.authenticate,PostController.destroy)

module.exports = router;