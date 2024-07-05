import { useState } from "react"
import './searchbar.css'
import axios from "axios"

function SearchBar()    {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState([])

    const handleQueryChange = async (e) => {
        const userQuery = e.target.value
        setQuery(userQuery)

        // not just update the state variable but also call the api to get the books searching from the query
        const response = await axios.get('http://localhost:4000/api/books/search/' + userQuery)

        if (response.status === 200)    {
            setBooks(response.data.data)
        } else {
            alert("There was an error in calling the API")
        }
    }

    console.log("These are searched books", books)

    return (
        <div className="searchbar">
            <input type="text" value={query} onChange={handleQueryChange} />
        </div>
    )
}

export default SearchBar;