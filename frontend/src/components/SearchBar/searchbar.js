import { useState } from "react"
import './searchbar.css'
import axios from "axios"

// GOAL: Inside searchbar.js, create the UI to map over all the searched books
// [X] Integrate the search API
// [X] If there are books to show in my search response from the API, I will show them in a separate container
// [X] If there are no books to show in my search response from the API, my container will say 'No such books found'

function SearchBar()    {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState([])
    const [booksFound, setBooksFound] = useState(true);

    const handleQueryChange = async (e) => {
        const userQuery = e.target.value
        setQuery(userQuery)

        // not just update the state variable but also call the api to get the books searching from the query
        const response = await axios.get('http://localhost:4000/api/books/search/' + userQuery)

        if (response.status === 200)    {
            setBooks(response.data.data)
            if (response.data.data.length === 0)    {
                setBooksFound(false);
            }
        } else {
            alert("There was an error in calling the API")
        }
    }

    console.log("These are searched books", books)

    return (
        <div className="searchbar">
            <input type="text" value={query} onChange={handleQueryChange} />

            { books.length > 0 &&
                <div className="searchResults">
                <table>
                    <tr className="header">
                        <th>Author</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Year of Publication</th>
                    </tr>

                    {books.map((book, index) => {
                        return (
                            <tr key={index}>
                                <td>{book.author}</td>
                                <td><img src={book.image}></img></td>
                                <td>{book.title}</td>
                                <td>{book.yearOfPublication}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>}

            {
                !booksFound && <div className="message">No Books Found</div>
            }
        </div>
    )
}

export default SearchBar;