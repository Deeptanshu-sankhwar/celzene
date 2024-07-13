const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
    },
    correctOption: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;