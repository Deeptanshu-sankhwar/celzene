import { Link } from "react-router-dom"
import './navbar.css';

function Navbar()   {

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Signup</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/todo">Todo</Link>
                </li>
                <li>
                    <Link to="/counter">Counter</Link>
                </li>
                <li>
                    <Link to="/showUsers">Show Users</Link>
                </li>
                <li>
                    <Link to="/books">Show Books</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar