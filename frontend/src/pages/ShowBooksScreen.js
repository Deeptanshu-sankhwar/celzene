// Steps to create a screen to show all the books
// Step [X] Create a file inside the pages folder
// Step [X] Write a function to call the api to get all the books
// STep [X] useEffect to get the api respose in my state varaibles
// Step [X] Create the table by mapping my state variables which is a list of books

// TODO:
// [X] Create a column, called Is Issued, which basically tells Yes or No if the book is issued or not [This completes future number 5]
// [X] Create a new column, called delete which is used to soft delete a book (take reference from show users screen)
// [X] Go back to your backend, and inside bookRoutes, write a new API to soft delete a book (you can take reference from soft delete user API) [This complese feature 6]

// Truthy/Falsy value
// 0, null, undefined, '' = false
// 1, any number, any string, or any non null array = true

// Ternary operator -> inline implementation of an if-else statement
// if (name == 'Venkatesh')    {
//     console.log('Reddy')
// } else {
//     console.log("Praveen")
// }
// (condition) ? (truth code) : (false code)
// (name == 'Venkatesh') ? (console.log('Reddy')) : (console.log("Praveen"))

// Problem
// if (age > 18)   {
//     mature = false;
//     alchohol = true
// } else {
//     if (age < 16)   {
//         mature = true;
//         alchohol = false;
//     } else {
//         mature = false;
//         alchohol = false;
//     }
// }
// Convert this if-else statement into one line ternary statement
// (age > 18) ? {mature=false; alchohol=true} : {(age < 16) ? {mature=true;alcholo=false} : {mature=false;alchohoil=false}};


import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowUsersScreen.css'

function ShowBooksScreen()  {

    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])

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

    const fetchAllUsers = async () => {
        // I need to pass the token in the headers

        // this token will be coming from the browser cookies or local storage
        const response = await axios.get('http://localhost:4000/api/data', {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        // now I have to store this API response inside my state for this component, which later I can show as a table
        if (response.data.success === true) {
            setUsers(response.data.data)
        } else {
            alert(response.data.message)
        }
    }

    // (users.filter((user) => user._id === book.issuedBy))[0]?.name

    useEffect(() => {
        fetchAllBooks()
        fetchAllUsers() // now I have the data about all the users which I can show in the dropdown
    }, [])

    const softDeleteBook = async (id) => {
        // call the api to soft delete the book
        const response = await axios.put('http://localhost:4000/api/book/delete/' + id)

        if (response.status === 200)    {
            const newBooks = books.filter(book => book._id !== id);
            setBooks(newBooks)
        } else {
            alert('Some error while trying to delete the book')
        }
    }

    const issueBookToUser = async (e, bookId) => {
        const issueUserId = e.target.value;

        const payload = {
            studentId: issueUserId
        }
        
        // call the api to assign the book to the user
        const response = await axios.put('http://localhost:4000/api/issueBook/' + bookId, payload, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        if (response.status === 200)    {
            alert("Book has been successfully issued")
        } else {
            alert("Error while issuing the book")
        }
    }

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
                        <th>Issued?</th>
                        <th>Delete</th>
                        <th>Issue Book</th>
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
                                <td>{(book.issuedBy == null) ? 'Book hasnt been issued' : 'Book has already been issued'}</td>
                                <td><button onClick={() => softDeleteBook(book._id)}>Delete</button></td>
                                <td>
                                    <select onChange={(e) => issueBookToUser(e, book._id)}>
                                        {
                                            (book.issuedBy == null) ? <option></option> : <option>{(users.filter((user) => user._id === book.issuedBy))[0]?.name}</option>
                                        }
                                        {
                                            users.map((user, index) => {
                                                return <option key={index} value={user._id}>{user.name}</option> 
                                            })
                                        }
                                    </select>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default ShowBooksScreen;