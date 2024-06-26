const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth')

const bookController = require('../controllers/bookController')

router.get('/books', protect, bookController.getAllBooks)

module.exports = router