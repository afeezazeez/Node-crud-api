const express =  require('express');
const  router =  express.Router();
const PostController =  require('../controllers/PostController');
const {authenticate} = require('../middleware/authMiddleware');
const setMaxSize =  require('../utils/setMaxSize')
const multerErrorHandler = require('../middleware/multerErrorHandler');
const { createMulterUpload } = require('../config/multer');

const uploadPostImage = createMulterUpload({
    maxSize: 2 * 1024 * 1024, // 2 MB
    allowedMimeTypes: ['image/jpeg', 'image/png'],
});


router.get("",PostController.index);
router.get("/:id",PostController.show)

router.use(authenticate);

router.post("",setMaxSize(2 * 1024 * 1024), uploadPostImage.single('file'),multerErrorHandler,PostController.store);
router.patch("/:id",PostController.update)
router.delete("/:id",PostController.destroy)

module.exports = router;