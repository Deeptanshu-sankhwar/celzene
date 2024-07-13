const Game = require('../models/gameModel');

exports.createGame = async (req, res) => {
    try {
        const { title, userId, questions } = req.body;

        const game = new Game({
            title: title,
            userId: userId,
            questions: questions
        })

        await game.save();

        res.status(201).json({
            success: true,
            data: game
        })

    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.increaseGamePoint = async (req, res) => {
    try {
        const { id } = req.params;

        let game = await Game.findById(id);

        if (!game)  {
            res.status(404).json({
                success: false,
                message: 'Game not found'
            })
        }

        game = await Game.findByIdAndUpdate(id, { score: game.score + 1 })

        

        res.status(200).json({
            success: true,
            data: game
        })

    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getGamesOfUser = async (req, res) => {
    try {
        const { userId } = req.params;

        let games = await Game.find({ userId: userId });

        if (!games)  {
            res.status(404).json({
                success: false,
                message: 'Game not found'
            })
        }

        res.status(200).json({
            success: true,
            data: games
        })

    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getGameById = async (req, res) => {
    try {
        const { id } = req.params;

        let game = await Game.findById(id);

        if (!game)  {
            res.status(404).json({
                success: false,
                message: 'Game not found'
            })
        }

        res.status(200).json({
            success: true,
            data: game
        })

    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}