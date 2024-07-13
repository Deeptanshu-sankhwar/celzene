const Question = require('../models/questionModel');

exports.createQuestion = async (req, res) => {
    try {
        const { question, options, correctOption } = req.body;

        const questionDocument = new Question({
            question: question,
            options: options,
            correctOption: correctOption
        })

        await questionDocument.save();

        res.status(201).json({
            success: true,
            data: questionDocument
        })

    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getQuestionById = async (req, res) => {
    try {
        const {id } = req.params

        const question = await Question.findById(id)

        if (!question) {
            res.status(404).json({
                success: false,
                message: 'Question not found'
            })
        }

        res.status(200).json({
            success: true,
            data: question
        })

    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}