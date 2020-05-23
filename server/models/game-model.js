const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Game = new Schema(
    {
        code: { type: String, required: true },
        players: { type: Array, of: String },
        state: { type: Map, of: String },
        questions: { type: Array },
        characters: { type: Array }
    },
    { timestamps: true },
)

module.exports = mongoose.model('games', Game)
