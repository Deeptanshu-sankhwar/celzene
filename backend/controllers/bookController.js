const Book = require('../models/bookModel')

// Write a function that returns all the books present inside the database
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({ isDeleted: false })

        res.status(200).json({
            success: true,
            data: books
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}