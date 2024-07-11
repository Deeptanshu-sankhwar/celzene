import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import './navbar.css';

function Navbar()   {

    const width = window.innerWidth

    const [showNav, setShowNav] = useState(false)

    return (
        // need to check the size of the screen and accordingly render UI
        <nav className="navbar">
            {
                (width < 960) && <button className="hamburger" onClick={() => setShowNav(!showNav)}>Toggle Navbar</button>
            }
            {
                 
                <ul>
                    <li>
                        <Link to="/">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    {/* <li>
                        <Link to="/todo">Todo</Link>
                    </li>
                    <li>
                        <Link to="/counter">Counter</Link>
                    </li> */}
                    {/* <li>
                        <Link to="/showUsers">Show Users</Link>
                    </li>
                    <li>
                        <Link to="/books">Show Books</Link>
                    </li> */}
                    <li>
                        <Link to="/user-profile">User Profile</Link>
                    </li>
                    <li>
                        <Link to="/snake">Snake Game</Link>
                    </li>
                    <li>
                        <Link to="/rockpaperscissor">RPS Game</Link>
                    </li>
                    <li>
                        <Link to="/pokemon">Pokemon</Link>
                    </li>
                </ul>
            }
            
        </nav>
    )
}

export default Navbar