// Steps to create a screen to show all the books
// Step [X] Create a file inside the pages folder
// Step [X] Write a function to call the api to get all the books
// STep [X] useEffect to get the api respose in my state varaibles
// Step [X] Create the table by mapping my state variables which is a list of books

// TODO:
// 1. Create a row, called Is Issued, which basically tells Yes or No if the book is issued or not [This completes future number 5]
// 2. Create a new row, called which is used to soft delete a book (take reference from show users screen)
// 3. Go back to your backend, and inside bookRoutes, write a new API to soft delete a book (you can take reference from soft delete user API) [This complese feature 6]



import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowUsersScreen.css'

function ShowBooksScreen()  {

    const [books, setBooks] = useState([])

    const fetchAllBooks = async () => {
        const response = await axios.get('http://localhost:4000/api/books', {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        if (response.status === 200)    {
            setBooks(response.data.data)
        }
    }

    useEffect(() => {
        fetchAllBooks()
    }, [])

    return (
        <div>
            <h1>Show All the books</h1> 

            <table className="usertable">
                {
                    books.length > 0 &&
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Image</th>
                        <th>Year of Publication</th>
                        <th>Genre</th>
                    </tr>
                }

                {
                    books.map((book, index) => {
                        return (
                            <tr key={index}>
                                <td>{book._id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td><img src={book.image}></img></td>
                                <td>{book.yearOfPublication}</td>
                                <td>{book.genre}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default ShowBooksScreen;