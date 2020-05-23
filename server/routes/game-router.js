const express = require('express')

const GameCtrl = require('../controllers/game-ctrl')

const PlayerCtrl = require('../controllers/player-ctrl')

const router = express.Router()

router.post('/game', GameCtrl.createGame)
router.put('/game/:id', GameCtrl.updateGame)
router.delete('/game/:id', GameCtrl.deleteGame)
router.get('/game/:id', GameCtrl.getGameById)
router.get('/game/:id/start', GameCtrl.startGameById)
router.get('/games', GameCtrl.getGames)
router.get('/players', PlayerCtrl.getPlayers)
router.get('/players_for_room/:room_code', PlayerCtrl.getPlayersForRoom)



module.exports = router
