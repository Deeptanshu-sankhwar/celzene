const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth')

const bookController = require('../controllers/bookController')

router.get('/books', protect, bookController.getAllBooks)
router.get('/getIssuedBookDetails', protect, authorize('Admin'), bookController.getIssuedBookDetails)
router.post('/createBook', protect, authorize('Admin'), bookController.createBook)

router.put('/returnBook/:id', protect, authorize('Student'), bookController.returnBook)
router.put('/issueBook/:id', protect, authorize('Admin'), bookController.issueBook)

// search book api by its title and author
router.get('/books/search/:query', bookController.searchBook)

module.exports = router