const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Game = new Schema(
    {
        code: { type: String, required: true },
        theme: { type: String, required: true },
        players: { type: Array, of: String },
        state: { type: Map, of: String },
        questions: { type: Array },
        movies: {type: Array },
        characters: { type: Array },
        start_time: { type: Date }
    },
    { timestamps: true },
)

module.exports = mongoose.model('games', Game)
