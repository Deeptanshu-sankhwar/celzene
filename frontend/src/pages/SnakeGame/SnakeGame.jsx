import { useState, useEffect } from "react";
import './SnakeGame.css'


function SnakeGame() {

    const GRID_SIZE = 20;
    const FPS = 100;
    const INIT_SNAKE = [
        { x: 0, y: 0},
    ]
    const INIT_FOOD = {
        x: 7,
        y: 5
    }

    const [snake, setSnake] = useState(INIT_SNAKE)  
    const [food, setFood] = useState(INIT_FOOD)
    const [gameOver, setGameOver] = useState(false)
    const [direction, setDirection] = useState("RIGHT")

    // Now I need to change the direction of my snake based on the input from my arrow keys in the keyboard
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch(e.key)   {
                case "ArrowUp":
                    setDirection("UP")
                    break;
                case "ArrowDown":
                    setDirection("DOWN")
                    break;
                case "ArrowLeft":
                    setDirection("LEFT")
                    break;
                case "ArrowRight":
                    setDirection("RIGHT")
                    break;
                default:
                    break;
            }
        }

        // make changes in my DOM (Document Object Model) in order to bind the handleKeyDown event to the press of key on my keyboard
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);    
        }
    }, [])

    // now I need to move my snake based upon the direction I am changing. Make use of useEffet stage 3 which calls my useEffect code everytime my state variable for direction, food or gameOver change
    // this useffect is majorly responsible for moving my snake whenever my state variable changes
    useEffect(() => {
        if (gameOver) return;

        const moveSnake = () => {
            setSnake((prevSnake) => {
                const newSnake = [...prevSnake]
                const head = { ...newSnake[0] };

                switch (direction)  {
                    case "UP":
                        head.y -= 1
                        break;
                    case "DOWN":
                        head.y += 1
                        break;
                    case "RIGHT":
                        head.x += 1
                        break;
                    case "LEFT":
                        head.x -= 1
                        break;
                    default:
                        break;
                }

                newSnake.unshift(head);

                //checking if snake eats the food
                if (head.x === food.x && head.y === food.y) {
                    // everytime snake successsfully eats a food, we need to intiialise a new food on the grid
                    setFood({
                        x: Math.floor(Math.random() * GRID_SIZE),
                        y: Math.floor(Math.random() * GRID_SIZE)
                    })
                } else {
                    newSnake.pop()
                }

                // identify if the snake crashed with the walls and set the game to be over
                if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || newSnake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)) {
                    // intialize the head.x, heaed.y to start from staring coordinate again in order for the game to not be over while crashing with the walls 
                    setGameOver(true)
                }

                return newSnake
            })
        }

        const intervalId = setInterval(moveSnake, FPS);
        return () => clearInterval(intervalId)
    }, [direction, food, gameOver])


    return (

        <div>
            <h1>Snake Game</h1>

            {
                gameOver && <h2>GAME OVER!!!</h2>
            }

            <div className="grid">
            {
                Array.from({ length: GRID_SIZE }).map((_, row) => 
                    Array.from({ length: GRID_SIZE }).map((_, col) => (
                        <div className={`cell ${snake.some(segment => segment.x === col && segment.y === row) ? 'snake' : ''} ${(food.x === col && food.y === row) ? 'food' : ''}`}>
                            
                        </div>
                    ))
                )
            }
            </div>
        </div>
    )
}

// I need to intiailise an array of 50 element in js
// Array.from({ length: 50 })

export default SnakeGame