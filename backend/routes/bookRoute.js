const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth')

const bookController = require('../controllers/bookController')

router.get('/books', protect, bookController.getAllBooks)
router.get('/getIssuedBookDetails', protect, authorize('Admin'), bookController.getIssuedBookDetails)
router.post('/createBook', protect, authorize('Admin'), bookController.createBook)

module.exports = router