const Game = require('../models/game-model')
const Player = require('../models/player-model')

createGame = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Game',
        })
    }
    console.log(body)

    const game = new Game(body)
    game.state = {}
    game.questions = {}

    if (!game) {
        return res.status(400).json({ success: false, error: err })
    }

    game
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: game._id,
                message: 'Game created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Game not created!',
            })
        })
}

updateGame = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Game.findOne({ _id: req.params.id }, (err, game) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Game not found!',
            })
        }

        game.code = body.code

        const player = new Player({name: req.body.name, code: req.body.code})

        if (!player) {
            return res.status(400).json({ success: false, error: err })
        }

        player
            .save()
            .then(() => {
                game.players.push(player._id)
                game
                    .save()
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            id: game._id,
                            message: 'Game updated!',
                        })
                    })
                    .catch(error => {
                        return res.status(404).json({
                            error,
                            message: 'Game not updated!',
                        })
                    })
                
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Player not created!',
                })
            })
    })
}

deleteGame = async (req, res) => {
    await Game.findOneAndDelete({ _id: req.params.id }, (err, game) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!game) {
            return res
                .status(404)
                .json({ success: false, error: `Game not found` })
        }

        return res.status(200).json({ success: true, data: game })
    }).catch(err => console.log(err))
}

getGameById = async (req, res) => {
    await Game.findOne({ _id: req.params.id }, (err, game) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!game) {
            return res
                .status(404)
                .json({ success: false, error: `Game not found` })
        }
        return res.status(200).json({ success: true, data: game })
    }).catch(err => console.log(err))
}

startGameById = async (req, res) => {
    await Game.findOne({ _id: req.params.id }, (err, game) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!game) {
            return res
                .status(404)
                .json({ success: false, error: `Game not found` })
        }
        game.state = { 
            "round": 1, 
            "spy": game.players[Math.floor(Math.random()*game.players.length)],
            "movie": "Harry Potter" 
        }
        game.questions = ["Where does your character live?", "What does your character do?", "What does your character want?"]
        game.characters = ["Harry", "Ron", "Hermione", "Hagrid", "Voldemort"]
        game
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    data: game,
                    message: 'Game updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Game not updated!',
                })
            })
        return res.status(200).json({ success: true, data: game })
    }).catch(err => console.log(err))
}

getGames = async (req, res) => {
    await Game.find({}, (err, games) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!games.length) {
            return res
                .status(404)
                .json({ success: false, error: `Game not found` })
        }
        return res.status(200).json({ success: true, data: games })
    }).catch(err => console.log(err))
}

module.exports = {
    createGame,
    updateGame,
    startGameById,
    deleteGame,
    getGames,
    getGameById,
}
