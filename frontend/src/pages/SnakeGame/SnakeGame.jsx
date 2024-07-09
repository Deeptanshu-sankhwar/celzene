// Perform snake state variable coordinate changes on clicking the right button and left button as well.
// Render the updated snake configuration on the frontend
// Randomly generate coordinates where food would be placed and show it in yellow color.
// When the snake reaches the food, increase the snake by 1

import { useEffect } from "react";
import { useState } from "react";
import './SnakeGame.css'


function SnakeGame() {

    const GRID_SIZE = 10;
    const INIT_SNAKE = [
        { x: 2, y: 1},
    ]

    const [snake, setSnake] = useState(INIT_SNAKE)  
    
    useEffect(() => {
        const handleKeyPress = (e) => {
            let newSnakeCoordinates = snake;
            switch(e.key)   {
                case 'ArrowUp':
                    // move the snake by one up point
                    for (let i = 0; i < newSnakeCoordinates.length; i++) {
                        newSnakeCoordinates[i].y = newSnakeCoordinates[i].y - 1;
                    }
                    setSnake(newSnakeCoordinates)
                case 'ArrowDown':
                    // move the snake by one down point
                    for (let i = 0; i < newSnakeCoordinates.length; i++) {
                        newSnakeCoordinates[i].y = newSnakeCoordinates[i].y + 1;
                    }
                    setSnake(newSnakeCoordinates)
                case 'ArrowLeft':
                    // move the snake by one left point

                case 'ArrowRight:':
                    // move the snake by one right point
            }
        }
        window.addEventListener('keydown', handleKeyPress)
    })

    return (

        <div>
            <h1>Snake Game</h1>

            <div className="grid">
            {
                Array.from({ length: GRID_SIZE }).map((_, row) => 
                    Array.from({ length: GRID_SIZE }).map((_, col) => (
                        <div className={`cell ${snake.some(segment => segment.x === col && segment.y === row) ? 'snake' : ''}`}>
                            
                        </div>
                    ))
                )
            }
            </div>
        </div>
    )
}

export default SnakeGame