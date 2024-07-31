const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/find/:id', getUserById)

module.exports = router;