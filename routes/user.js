const express =  require('express');
const  router =  express.Router();
const AuthController =  require('../controllers/AuthController');
const {authenticate} = require('../middleware/auth')

router.post("/register",AuthController.register);
router.post("/login",AuthController.login);
router.delete("/logout",authenticate,AuthController.logout);

module.exports = router;