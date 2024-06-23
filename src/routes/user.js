const express =  require('express');
const { createMulterUpload } = require('../config/multer');
const  router =  express.Router();
const AuthController =  require('../controllers/AuthController');
const userAvatarController =  require('../controllers/UserAvatarController');
const {authenticate} = require('../middleware/authMiddleware');
const multerErrorHandler = require('../middleware/multerErrorHandler');
const setMaxSize =  require('../utils/setMaxSize')

const uploadAvatar = createMulterUpload({
    maxSize: 2 * 1024 * 1024, // 2 MB
    allowedMimeTypes: ['image/jpeg', 'image/png'],
});


router.post("/register",AuthController.register);
router.post("/login",AuthController.login);

router.use(authenticate);
router.delete("/logout",AuthController.logout);
router.post('/avatar-upload', setMaxSize(2 * 1024 * 1024), uploadAvatar.single('file'),multerErrorHandler, userAvatarController.uploadAvatar);
router.post('/avatar-upload-multiple', setMaxSize(2 * 1024 * 1024), uploadAvatar.array('files', 2), multerErrorHandler, userAvatarController.uploadMultipleAvatars);


module.exports = router;