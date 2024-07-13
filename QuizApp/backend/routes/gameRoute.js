const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/auth')

const gameController = require('../controllers/gameController')

router.post('/create', protect, gameController.createGame);
router.put('/increasescore/:id', protect, gameController.increaseGamePoint)
router.get('/getGamesOfUser/:userId', protect, gameController.getGamesOfUser)
router.get('/getGameById/:id', protect, gameController.getGameById)

module.exports = router;