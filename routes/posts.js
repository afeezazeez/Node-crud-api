const express =  require('express');
const  router =  express.Router();
const PostController =  require('../controllers/PostController');
const {authenticate} = require('../middleware/authMiddleware');

router.get("",PostController.index);
router.get("/:id",PostController.show)

router.use(authenticate);

router.post("",PostController.store);
router.patch("/:id",PostController.update)
router.delete("/:id",PostController.destroy)

module.exports = router;