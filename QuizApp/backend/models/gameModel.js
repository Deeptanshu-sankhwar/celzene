const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null 
    },
    score: {
        type: Number,
        default: 0,
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question',
        default: [],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game;