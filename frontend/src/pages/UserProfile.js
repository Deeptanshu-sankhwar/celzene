// TODO:
// [X] Write an API that returns the user information of a single user from his/her id
// [X] In my screen, I need to show the name and email of the user who is logged in
// [X] Write an API that returns the books which the logged in user has issued
// [X] I need to show a table which contains the list of books issed by the signed user

import { useState, useEffect } from "react"
import { jwtDecode } from 'jwt-decode'  // npm install jwt-decode
import axios from 'axios' // npm install axios
import './ShowUsersScreen.css'

function UserProfile() {

    const [user, setUser] = useState()
    const [books, setBooks] = useState([])

    // [X] I need to fetch the current token from my local storage -> Stage 2
    // [X] I need to extract the id of the user from the local storage -> Stage 2
    // [X] I need to call the api to get the user from my database using the id coming from the local storage token -> Stage 2
    // [X] I need to store the response of this api inside my user state variable -> Stage 2
    // [X] I need to render the information stored inside my user state variable -> Stage 3

    const fetchLoggedInUserDetails = async () => {
        const token = localStorage.getItem('token');
        const loggedInUser = jwtDecode(token);
        const loggedInUserId = loggedInUser?.id

        // I need to call the api to get the user from my database using the id coming from the local storage token
        const response = await axios.get('http://localhost:4000/api/user/' + loggedInUserId, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })

        if (response.status === 200)    {
            setUser(response.data.data)
        } else {
            alert("There is an error while calling the API. Please try again.")
        }
    }

    const fetchIssuedBooksByUser = async () => {
        const token = localStorage.getItem('token');
        const loggedInUser = jwtDecode(token);
        const loggedInUserId = loggedInUser?.id

        // I need to call the api to get all the books inside my dabatbase which my logged in user has currently issued
        const response = await axios.get('http://localhost:4000/api/books/issued/' + loggedInUserId, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })

        if (response.status === 200)    {
            setBooks(response.data.data)
        } else {
            alert("There is an error while calling the API. Please try again.")
        }
    }

    useEffect(() => {
        fetchLoggedInUserDetails()
        fetchIssuedBooksByUser()
    }, []);

    const returnBook = async (bookId) => {
        const token = localStorage.getItem('token');

        // Using the the id of this book, I want to call the api to return this book
        const response = await axios.put('http://localhost:4000/api/returnBook/' + bookId, {}, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })

        if (response.status === 200)    {
            console.log("The book was successfully returned")
            const newBooks = books.filter((book) => book._id !== bookId);
            setBooks(newBooks);
        } else {
            alert("There is an error while returning the book")
        }
    }

    console.log("The user has these following books", books)

    return (
        <div>
            <h1>User profile who is logged in!</h1>

            <div>
                <h4>Name: {user?.name}</h4>
                <h4>Email: {user?.email}</h4>
                <h4>Role: {user?.role}</h4>
            </div>

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
                        <th>Return Book</th>
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
                                <td><button onClick={() => returnBook(book._id)}>Return</button></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default UserProfile;