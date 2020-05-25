const Game = require('../models/game-model')
const Player = require('../models/player-model')

const movie_list = [
    ["Harry Potter", "Ron", "Harry", "Hagrid", "Hermione", "Dumbledore", "Voldemort"],
    ["Lord of the Rings", "Frodo", "Gandalf", "Legolas", "Saruman", "Golum", "Gimli"],
    ["Avengers", "Thanos", "Captain America", "Iron Man", "Black Widow", "Thor", "Hulk"],
    ["Titanic", "Jack", "Rose", "Iceburg", "The Captain", "Brock Lovett", "Rose's Fiance"],
    ["Peter Pan", "Hook", "Peter Pan", "Tinkerbell", "Wendy", "A Lost Boy", "Alligator"],
    ["Star Wars", "Darth Vader", "Princess Leia", "Luke Skywalker", "Chewbacca", "Han Solo", "Yoda"],
    // ["Star Trek", "Captain Kirk", "Spock", ],
    ["Frozen", "Elsa", "Anna", "Olaf", "Christoff", "Hans", "Christoff's Reindeer"],
    ["Lion King", "Simba", "Nala", "Mufasa", "Scar", "Pumba", "Timon"],
    ["The Incredibles", "Mr. Incredible", "Mrs. Incredible", "Dash", "Violet", "Jack Jack", "Syndrome"],
    // ["Iron Man", "Iron Man", ],
    ["Transformers", "Bumblebee", "Optimus Prime", "Megatron", "Shia Lebouf", "Starscream", "Megan Fox"],
    ["Toy Story", "Buzz Lightyear", "Andy", "Woody", "Mr. Potato Head", "Jessie", "Slinky Dog"],
    ["Pirates of the Caribbean", "Jack Sparrow", "Elizabeth Swan", "Will Turner", "Davy Jones", "Hector Barbosa", "The Ship"],
    ["Alladin", "Jaffar", "Alladin", "Genie", "Jasmine", "Abu", "The Sultan"],
    ["Despicable Me", "Gru", "Bob the minion", "Agnes", "Margo", "Edith", "Vector"],
    ["Finding Nemo", "Nemo", "Dory", "Marlin", "Mr. Ray", "A shark", "The dentist"],
    ["Alice in Wonderland", "Alice", "The Mad Hatter", "The Red Queen", "The Cheshire Cat", "White Rabbit", "Tweedledum"],
    ["Home Alone", "Kevin McCalister", "Marv", "Harry", "Megan McCalister", "The tarantula", "Buzz McCalister"],
    // ["Indiana Jones", ""],
    ["The Wizard of Oz", "Dorothy", "The Tin Man", "The Scarecrow", "The Cowardly Lion", "Toto", "The Wicked Witch"],
    ["Forest Gump", "Forest Gump", "Bubba", "Jenny", "Lt. Dan", "Drill Sargent", "A black panther"],
    // ["Jaws"],
    ["Elf", "Buddy", "Santa", "Jovie", "Walter", "Michael", "Miles Finch"],
    ["Monsters Inc", "Boo", "Mike Wazowski", "James P. Sullivan", "Randall Boggs", "Roz", "A Door"],
    ["Back to the Future", "Doc", "Marty McFly", "Jennifer Parker", "Biff", "Lorraine McFly", "George McFly"],
    ["Mean Girls", "Regina George", "Karen Smith", "Gretchen Wieners", "Cady Heron", "Janis Ian", "Ms. Norbury"],
    ["Romeo and Juliet", "Romeo", "Juliet", "Mercutio", "Friar Lawrence", "The Montagues", "The Capulets"],
    // ["Terminator", ],
    ["The Matrix", "Neo", "Morpheus", "the Oracle", "Trinity", "Cypher", "Agents of the Matrix"],
    ["Spy Kids", "Carmen Cortez", "Juni Cortez", "Machete", "Donagon Giggles", "The Transmooker", "The Guy"],
    ["Hunger Games", "Catniss", "Haymitch", "Peeta", "Gayle", "Rue", "Effie Trinket"],
    ["Legally Blond", "Ella Woods", "Warner Huntington III", "Vivian Kensington", "Paulette Bonafonte", "The UPS Guy", "Moonie"],
    ["Captain Marvel", "Captain Marvel", "Nick Fury", "Talos", "Korath", "Ronan the Accuser", "Phil Coulson"],
]

const question_list_1 = [
    "Where do you live?",
    "Where do you shop?",
    "Where have you travelled?",
    "What is your goal?",
    "What is your job?"
]
const question_list_2 = [
    "What do you want?",
    "What do you love?",
    "What makes you happy?",
    "What is the best thing you've done?",
    "What is the best thing thats happened to you?",
]

const question_list_3 = [
    "What do you fear?",
    "What makes you sad?",
    "What is the worst thing you've done?",
    "What is the worst thing thats happened to you?",
]
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
    game.characters = {}

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

    await Game.findOne({ _id: req.params.id }, (err, game) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Game not found!',
            })
        }

        game.state.set('round', body.round)

        Player.findOne({ name: req.body.name, code: body.code }, (err, p) => {
            if (p !== null) {
                game
                    .save()
                    .then(() => {
                        console.log(body.round)
                        console.log(game.state)
                        return res.status(200).json({
                            success: true,
                            id: game._id,
                            message: 'Game updated!',
                        })
                    })
                    .catch(error => {
                        console.log(game.state)
                        return res.status(404).json({
                            error,
                            message: 'Game not updated!',
                        })
                    })
            } else {
                const player = new Player({name: req.body.name, code: req.body.code, character: ""})
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
            }
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

        game.players.forEach(player_id =>
            Player.findOneAndDelete({ _id: player_id }, (err, player) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
            })
        )

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
        const movie = movie_list[Math.floor(Math.random()*movie_list.length)]
        game.state = { 
            "round": 1, 
            "spy": game.players[Math.floor(Math.random()*game.players.length)],
            "movie": movie[0]
        }

        game.questions = [
            question_list_1[Math.floor(Math.random()*question_list_1.length)],
            question_list_2[Math.floor(Math.random()*question_list_2.length)],
            question_list_3[Math.floor(Math.random()*question_list_3.length)]
        ]
        game.characters = movie.slice(1, movie.length)
        game
            .save()
            .then(() => {
                game.players.forEach(player_id =>
                    Player.findOne({ _id: player_id }, (err, player) => {
                        player.character = game.characters[Math.floor(Math.random()*game.characters.length)]
                        player
                            .save()
                            .then(() => {
                                return res.status(200).json({
                                    success: true,
                                    id: game,
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
                )
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

deleteEverything = async (req, res) => {
    await Game.find({}, (err, games) => {
        games.forEach(game => {
            Game.findOneAndDelete({ _id: game.id }, (c,d) => {
            })
        })
        Player.find({}, (err, players) => {

            players.forEach(player => {
                Player.findOneAndDelete({ _id: player.id }, (a,b) => {
                })
            })
        })
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
    deleteEverything
}
