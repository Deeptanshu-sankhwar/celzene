import { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'  // npm install jwt-decode
import './GameList.css'
import { Link } from 'react-router-dom'

function GameList() {

    const [games, setGames] = useState([])

    const fetchGamesOfUser = async() => {
        const token = localStorage.getItem('token');
        const loggedInUser = jwtDecode(token);
        const loggedInUserId = loggedInUser?.id

        const response = await axios.get('http://localhost:5789/api/game/getGamesOfUser/' + loggedInUserId, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })

        if (response.status === 200)    {
            setGames(response.data.data)
        } else {
            alert("some error in getting the games of a user")
        }
    }

    console.log("GAmes for this user are ", games)

    useEffect(() => {
        fetchGamesOfUser();
    }, [])

    return (
        <div>
            {
                games && games.map((game, index) => {
                    return (
                        <div key={index} className="gamelist">
                            <div>{game?.title}</div>
                            <div>{game?.score}</div>
                            <button><Link to={`/game/${game._id}`}>Play Now</Link></button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GameList