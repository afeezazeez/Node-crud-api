const express =  require('express');
const  router =  express.Router();
const AuthController =  require('../controllers/AuthController');
const userAvatarController =  require('../controllers/UserAvatarController');
const {authenticate} = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'src/uploads/' });


router.post("/register",AuthController.register);
router.post("/login",AuthController.login);

router.use(authenticate);
router.delete("/logout",AuthController.logout);
router.post('/avatar-upload', upload.single('avatar'), userAvatarController.uploadAvatar);


module.exports = router;