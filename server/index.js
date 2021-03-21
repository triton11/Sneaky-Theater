const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cron = require('node-cron');

const gameRouter = require('./routes/game-router')
const Game = require('./models/game-model')
const Player = require('./models/player-model')


const db = require('./db')

const app = express()
const apiPort = 3000
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', gameRouter)


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

// Schedule tasks to be run on the server.
cron.schedule('0 1 * * *', async() => {
  console.log('checking for old games');
  const today = new Date()
  await Game.deleteMany({ "updatedAt": { $lt: new Date(new Date().setDate(new Date().getDate()-2))} }, (err, games) => {
    console.log(new Date(new Date().setDate(new Date().getDate()-2)))
    console.log(games["deletedCount"])
  }).catch(err => console.log(err))
});

cron.schedule('1 1 * * *', async() => {
  console.log('checking for old players');
  const today = new Date()
  await Player.deleteMany({ "updatedAt": { $lt: new Date(new Date().setDate(new Date().getDate()-2))} }, (err, players) => {
    console.log(new Date(new Date().setDate(new Date().getDate()-2)))
    console.log(players["deletedCount"])
  }).catch(err => console.log(err))
});