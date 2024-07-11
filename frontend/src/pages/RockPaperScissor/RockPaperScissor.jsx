import { useState, useEffect } from 'react'
import Button from '../../components/Button/button'
import './RockPaperScissor.css'

const ROCK = 'rock'
const PAPER = 'paper'
const SCISSOR = 'scissor'

const ROCK_IMAGE = 'https://w7.pngwing.com/pngs/422/99/png-transparent-rock-paper-scissors-computer-icons-scissors-game-white-face.png'
const SCISSOR_IMAGE = 'https://img.lovepik.com/free-png/20211216/lovepik-scissors-png-image_401704653_wh1200.png'
const PAPER_IMAGE = 'https://brendan-fisher.github.io/rock_paper_scissors/images/paper.png'

const PLAYER1 = 'player1'
const PLAYER2 = 'player2'
const DRAW = 'DRAW'

function RockPaperScissor() {
    // states needed
    // 1. Where the game is running or is it over (isGameOver)
    // 2. The current move of player 1
    // 3. The current move of player 2
    // 4. The current score of player 1
    // 5. The current score of player 2
    // 6. The number of total moves in the game
    // 7. The current move of the game

    const [isGameOver, setIsGameOver] = useState(false);
    const [startGame, setStartGame] = useState(false)
    const [player1Move, setPlayer1Move] = useState();
    const [player2Move, setPlayer2Move] = useState();
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [totalMoves, setTotalMoves] = useState(0);
    const [currentMove, setCurrentMove] = useState(0);
    const [winner, setWinner] = useState();
    const [moveImage, setMoveImage] = useState();

    const gameAction = (move) => {
        if (move === ROCK)  {
            setMoveImage(ROCK_IMAGE)
        } else if (move === SCISSOR)    {
            setMoveImage(SCISSOR_IMAGE)
        } else if (move === PAPER)  {
            setMoveImage(PAPER_IMAGE)
        }

        if (currentPlayer === PLAYER1)  {
            setPlayer1Move(move);
            setCurrentPlayer(PLAYER2);
        } else if (currentPlayer === PLAYER2) {
            setPlayer2Move(move);
            setCurrentPlayer(PLAYER1)
            // after the player2 we need to increase the current move by 1        
            setCurrentMove(currentMove + 1);
        }
    }

    useEffect(() => {
        // after the player2 plays, we need to update the scoreboards
        if (player1Move === ROCK && player2Move === PAPER)   {
            setPlayer2Score(player2Score + 1);
        } else if (player1Move === ROCK && player2Move === SCISSOR) {
            setPlayer1Score(player1Score + 1);
        } else if (player1Move === PAPER && player2Move === ROCK)   {
            setPlayer1Score(player1Score + 1);
        } else if (player1Move === PAPER && player2Move === SCISSOR)    {
            setPlayer2Score(player2Score + 1);
        } else if (player1Move === SCISSOR && player2Move === ROCK) {
            setPlayer2Score(player2Score + 1);
        } else if (player1Move === SCISSOR && player2Move === PAPER)    {
            setPlayer1Score(player1Score + 1);
        }

        if (currentMove === totalMoves && totalMoves !== 0) {
            if (player1Score > player2Score) {
                setWinner(PLAYER1)
            } else if (player2Score > player1Score) {
                setWinner(PLAYER2)
            } else {
                setWinner(DRAW);
            }
            setIsGameOver(true)
        }
    }, [player2Move, currentMove])

    const handleTotalMoves = (e) => {
        setTotalMoves(parseInt(e.target.value))
    }

    const handleStartGame = () => {
        setStartGame(true);
    }

    const restartGame = () => {
        window.location.reload();
    }

    return (
        <div>
            <h2>Rock Paper Scissor Game</h2>

            <h3>Select Total Moves: <input type="number" onChange={handleTotalMoves} /><Button text={'Start Game'} fn={handleStartGame} /></h3>

            {
                startGame &&
                <>
                    <h4>Current Move: {currentMove}</h4>
                    <div className="game-container">
                        <div className="user-container">
                            <h3>Player 1</h3>
                            <h4>Score: {player1Score}</h4>
                        </div>
                        <div className="user-container">
                            <h3>Player 2</h3>
                            <h4>Score: {player2Score}</h4>
                        </div>
                    </div>

                    <img src={moveImage} />

                    <div className="action-container">
                        <Button text={ROCK} fn={() => gameAction(ROCK)} />
                        <Button text={PAPER} fn={() => gameAction(PAPER)} />
                        <Button text={SCISSOR} fn={() => gameAction(SCISSOR)} />
                    </div>
                </>
            }

            {
                isGameOver && <><h2>The winner of this game is {winner}</h2><Button text={'Restart Game'} fn={restartGame} /></>
            }
        </div>
    )
}

export default RockPaperScissor