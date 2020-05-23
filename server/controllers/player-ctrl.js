const Player = require('../models/player-model')
const Room = require('../models/player-model')

createPlayer = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a player',
        })
    }
    console.log(body)

    const player = new Player(body)

    if (!player) {
        return res.status(400).json({ success: false, error: err })
    }

    player
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: player._id,
                message: 'player created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'player not created!',
            })
        })
}

updatePlayer = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Player.findOne({ _id: req.params.id }, (err, player) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'player not found!',
            })
        }
        player.name = body.name
        player
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: player._id,
                    message: 'player updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'player not updated!',
                })
            })
    })
}

deletePlayer = async (req, res) => {
    await Player.findOneAndDelete({ _id: req.params.id }, (err, player) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!player) {
            return res
                .status(404)
                .json({ success: false, error: `player not found` })
        }

        return res.status(200).json({ success: true, data: player })
    }).catch(err => console.log(err))
}

getPlayerById = async (req, res) => {
    await Player.findOne({ _id: req.params.id }, (err, player) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!player) {
            return res
                .status(404)
                .json({ success: false, error: `player not found` })
        }
        return res.status(200).json({ success: true, data: player })
    }).catch(err => console.log(err))
}

getPlayers = async (req, res) => {
    await Player.find({}, (err, players) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!players.length) {
            return res
                .status(404)
                .json({ success: false, error: `player not found` })
        }
        return res.status(200).json({ success: true, data: players })
    }).catch(err => console.log(err))
}

getPlayersForRoom = async (req, res) => {
    await Player.find({}, (err, players) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!players.length) {
            return res
                .status(404)
                .json({ success: false, error: `player not found` })
        }
        return res.status(200).json({ success: true, data: players.filter(function (p) { return p.code === req.params.room_code} ) 
        })
    }).catch(err => console.log(err))
}

module.exports = {
    createPlayer,
    updatePlayer,
    deletePlayer,
    getPlayers,
    getPlayerById,
    getPlayersForRoom
}
