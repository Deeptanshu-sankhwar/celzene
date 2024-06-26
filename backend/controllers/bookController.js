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

// Write a function that returns all the book details along with the student details who issued those books
exports.getIssuedBookDetails = async (req, res) => {
    try {
        // first I will find the books for whom isDelete: false
        // second I will populate the details of the user who have book.issuedBy as their id
        const books = await Book.find({ isDeleted: false }).populate({
            path: 'issuedBy',
            select: '_id name email role' // Select only the fields which we want to display in the response
        }).exec()

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

// Write a function which takes book details from the request body and saves it ad a document inside the book collection
exports.createBook = async (req, res) => {
    try {
        const { title, author, image, yearOfPublication, genre, issuedBy, issuedAt } = req.body

        const book = new Book({
            title: title,
            author: author,
            image: image,
            yearOfPublication: yearOfPublication,
            genre: genre,
            issuedBy: issuedBy,
            issuedAt: issuedAt
        })

        await book.save()

        res.status(201).json({
            success: true,
            data: book
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}