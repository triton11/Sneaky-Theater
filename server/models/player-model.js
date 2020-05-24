const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Player = new Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true },
        answers: { type: Array },
        character: { type: String }
    },
    { timestamps: true },
)

module.exports = mongoose.model('players', Player)
