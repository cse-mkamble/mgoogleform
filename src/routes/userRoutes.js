const router = require('express').Router();
const userController = require('../controllers/userController');

router.route("/login").get(userController.loginGet).post(userController.login)
router.post('/refresh_token', userController.generateAccessToken);
router.post('/logout', userController.logout);

module.exports = router;