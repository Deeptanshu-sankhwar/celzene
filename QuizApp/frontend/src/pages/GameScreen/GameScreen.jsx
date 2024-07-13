import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './GameScreen.css'

function GameScreen() {
    const { gameId } = useParams();
    
    const [game, setGame] = useState([])
    const [question, setQuestion] = useState('');
    const [currentScore, setCurrentScore] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [quizOver, setQuizOver] = useState(false)

    const fetchGameById = async () => {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5789/api/game/getGameById/' + gameId, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })

        if (response.status === 200)    {
            setGame(response.data.data)
        } else {
            alert('error fetching the game')
        }
    }

    const fetchCurrentQuestion = async () => {
        if (game.questions && currentQuestion < game?.questions.length) {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:5789/api/question/getQuestionById/' + game?.questions[currentQuestion], {
                headers: {
                    'authorization': 'Bearer ' + token
                }
            })
    
            if (response.status === 200)    {
                setQuestion(response.data.data)
            } else {
                alert('error fetching the game')
            }
        } else if (currentQuestion >= game?.questions?.length) {
            setQuizOver(true)
        }
        
    }

    console.log("Question", question)

    useEffect(() => {
        if (gameId) {
            fetchGameById()
        }
    }, [])

    useEffect(() => {
        if (gameId) {
            fetchCurrentQuestion()
        }
    }, [currentQuestion, game])

    const selectOption = (option) => {
        if (option === question.correctOption)  {
            setCurrentScore(currentScore + 1)

            // go to the next question
            setCurrentQuestion(currentQuestion + 1)
        } else {
            alert("wrong answer")
        }
    }

    return (
        <div>
            Score: {currentScore}
            {
                quizOver && <>Your Quiz is now over</>
            }
            {
                question && !quizOver &&
                <>
                    <div className='question'>{question?.question}</div>

                    <div className='options'>
                        <div className='row'>
                            <div className='col' onClick={() => selectOption(question?.options[0])}>{question?.options[0]}</div>
                            <div className='col' onClick={() => selectOption(question?.options[1])}>{question?.options[1]}</div>
                        </div>
                        <div className="row">
                            <div className='col' onClick={() => selectOption(question?.options[2])}>{question?.options[2]}</div>
                            <div className='col' onClick={() => selectOption(question?.options[3])}>{question?.options[3]}</div>
                        </div>
                    </div>
                </>
            }
            
        </div>
    )
}

export default GameScreen