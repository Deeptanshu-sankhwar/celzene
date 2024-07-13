const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/auth')

const questionController = require('../controllers/questionController')

router.post('/create', protect, questionController.createQuestion);
router.get('/getQuestionById/:id', protect, questionController.getQuestionById);

module.exports = router;