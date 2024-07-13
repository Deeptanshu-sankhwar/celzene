import { Link } from "react-router-dom"
import './Navbar.css';

function Navbar()   {

    return (
        // need to check the size of the screen and accordingly render UI
        <nav className="navbar">
                           
                <ul>
                    <li>
                        <Link to="/">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/game-list">Games List</Link>
                    </li>
                </ul>
            
            
        </nav>
    )
}

export default Navbar