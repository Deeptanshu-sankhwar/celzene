const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/auth')

const userController = require('../controllers/userController')

// User auth
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);

module.exports = router;