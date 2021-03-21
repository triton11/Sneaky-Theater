const Game = require('../models/game-model')
const Player = require('../models/player-model')

const protests_list = [
  ["Suffragists", "Susan B. Anthony", "Alice Paul", "Elizabeth Stanton", "Lucy Stone", "Lucretia Mott", "Frances E.W Harper"],
  ["Civil Rights Movement of 1960", "Martin Luther King Jr", "Malcolm X", "Rosa Parks", "John Lewis", "Little Rock Nine", "Stokely Carmichael"],
  ["LGBTQ Activists", "Marsha P. Johnson", "Harvey Milk", "Audre Lorde", "Sylvia Rivera", "Karl Heinrich Ulrichs", "Bayard Rustin"],
  ["Workers Rights", "Cesar Chavez", "Mother Jones", "Peter McGuire", "Eugene Debs", "Philip Randolph", "Samuel Gompers"],
  ["Abolitionists", "Harriet Tubman", "Frederick Douglas", "Sojourner Truth", "John Brown", "Harriet Beecher Stowe", "William Lloyd Garrison"],
  ["BLM", "Alicia Garza", "Erica Gardner", "DeRay Mckesson", "Bryan Stevenson", "NoName", "Patrisse Cullors", "Opal Tometi"],
  ["Environmentalists", "Rachel Carson", "John Muir", "Aldo Leopold", "Julia Hill", "Gaylord Nelson", "Theodore Roosevelt"],
  ["Harlem Rennesaince", "Zora Neale Hurston", "Langston Hughes", "W.E.B DuBois", "Marcus Garvey", "Alain Leroy Locke", "Louis Armstrong"],
  ["Whistleblowers", "Edward Snowden", "Daniel Ellsberg", "Bradley Manning", "Frank Serpico", "Deep Throat", "Joe Darby"],
  ["Journalists", "Ida B. Wells", "Upton Sinclair", "Woodward and Bernstein", "John Peter Zenger", "Ronan Farrow", "Judith Miller"],
  ["Anti-war Protestors", "Muhammad Ali", "John Lennon", "Bob Dylan", "Noam Chomsky", "Mary Beth Tinker", "Draft card burner"],
  ["Climate Activists", "Gretchen Thunberg", "Al Gore", "Xiuhtezcatl Martinez", "Xiye Bastida", "David Attenborough", "Varshini Prakash"],
  ["Immigrant Rights Activists", "Juan Escalante", "Jose Antonio Vargas", "Cristina Jimenez", "A DREAMer", "Erika Andiola", "ICE Detainee"],
  ["Democratic Socialists", "AOC", "Bernie Sanders", "Rashida Tlaib", "Jamaal Bowman", "Michael Harrington", "Michael Moore"]
]

const animated_movie_list = [
  ["Peter Pan", "Hook", "Peter Pan", "Tinkerbell", "Wendy", "A Lost Boy", "Alligator"],
  ["Frozen", "Elsa", "Anna", "Olaf", "Christoff", "Hans", "Christoff's Reindeer"],
  ["Lion King", "Simba", "Nala", "Mufasa", "Scar", "Pumba", "Timon"],
  ["The Incredibles", "Mr. Incredible", "Mrs. Incredible", "Dash", "Violet", "Jack Jack", "Syndrome"],
  ["Toy Story", "Buzz Lightyear", "Andy", "Woody", "Mr. Potato Head", "Jessie", "Slinky Dog"],
  ["Alladin", "Jaffar", "Alladin", "Genie", "Jasmine", "Abu", "The Sultan"],
  ["Despicable Me", "Gru", "Bob the minion", "Agnes", "Margo", "Edith", "Vector"],
  ["Finding Nemo", "Nemo", "Dory", "Marlin", "Mr. Ray", "A shark", "The dentist"],
  ["Alice in Wonderland", "Alice", "The Mad Hatter", "The Red Queen", "The Cheshire Cat", "White Rabbit", "Tweedledum"],
  ["Monsters Inc", "Boo", "Mike Wazowski", "James P. Sullivan", "Randall Boggs", "Roz", "A Door"],
  ["The Land Before Time", "Ducky", "Littlefoot", "Sharptooth", "Petrie", "Cera", "Chomper"],
  ["Snow White and the Seven Dwarves", "Snow White", "Evil Queen", "Magic Mirror", "Dopey", "Grumpy", "Doc"],
  ["Wreck-it Ralph", "Ralph", "Fix-it Felix", "Vanellope von Schweetz", "Sergeant Calhoun", "King Candy / Turbo", "Cy-Bug"],
  ["Inside Out", "Riley", "Joy", "Anger", "Dad", "Mom", "Bing Bong"],
  ["Shrek", "Shrek", "Donkey", "Fiona", "Puss in Boots", "Dragon", "Lord Farquaad"],
  ["Moana", "Moana", "Maui", "Tamatoa", "Sina", "Hei Hei the Rooster", "Chief Tui"],
  ["Kung Fu Panda", "Po", "Tigress", "Master Shifu", "Oogwa"],
  ["Madagascar", "Alex the Lion", "Marty the Zebra", "Melman the Giraffe", "Jullian the Lemur", "Gloria the Hippo", "Skipper"]
]

const classic_movie_list = [
  ["Titanic", "Jack", "Rose", "Iceburg", "The Captain", "Brock Lovett", "Rose's Fiance"],
  ["Home Alone", "Kevin McCalister", "Marv", "Harry", "Megan McCalister", "The tarantula", "Buzz McCalister"],
  ["The Wizard of Oz", "Dorothy", "The Tin Man", "The Scarecrow", "The Cowardly Lion", "Toto", "The Wicked Witch"],
  ["Forest Gump", "Forest Gump", "Bubba", "Jenny", "Lt. Dan", "Drill Sargent", "A black panther"],
  ["Elf", "Buddy", "Santa", "Jovie", "Walter", "Michael", "Miles Finch"],
  ["Back to the Future", "Doc", "Marty McFly", "Jennifer Parker", "Biff", "Lorraine McFly", "George McFly"],
  ["Romeo and Juliet", "Romeo", "Juliet", "Mercutio", "Friar Lawrence", "The Montagues", "The Capulets"],
  ["Legally Blond", "Ella Woods", "Warner Huntington III", "Vivian Kensington", "Paulette Bonafonte", "The UPS Guy", "Moonie"],
  ["Willy Wonka and the Chocolate Factory", "Willy Wonka", "Charlie Bucket", "Veruca Salt", "Grandpa Joe", "An Oompa Loompa", "Augustus Gloop"],
  ["Grease", "Rizzo", "Danny", "Sandy", "Frenchy", "Kenickie", "Principal McGee"],
  ["Jumanji", "Alan Parrish", "Sarah Whittle", "Judy Shephard", "Peter Shephard", "Professor Van Pelt", "A Monkey"],
  ["A Christmas Story", "Ralphie Parker", "Randy Parker", "The Old Man", "The Leg Lamp", "Flick", "Santa Claus"],
  ["Mary Poppins", "Mary Poppins", "Bert", "George Banks", "Bird Woman", "Jane Banks", "Michael Banks"],
  ["Spartacus", "Spartacus", "Crassus", "Julius Caeser", "Varinia", "Gracchus", "Draba"],
  ["The Godfather", "Don Corleone", "Michael Corleone", "Capt. McCluskey", "Sonny Corleone", "Clemenza", "Tom Hagen"],
  ["The Graduate", "Mrs. Robinson", "Ben Braddock", "Elaine Robinson", "Mr. Robinson", "Carl Smith", "Mrs. Braddock"],
  ["Jaws", "Brody", "Quint", "Hooper", "The Shark", "Chrissie", "Mayor Vaughn"],
  ["E.T the Extraterrestrial", "E.T.", "Elliot", "Michael", "Gertie", "Keys", "Mary"],
]

const adventure_movie_list = [
  ["Harry Potter", "Ron", "Harry", "Hagrid", "Hermione", "Dumbledore", "Voldemort"],
  ["Lord of the Rings", "Frodo", "Gandalf", "Legolas", "Saruman", "Golum", "Gimli"],
  ["Star Wars 4-6", "Darth Vader", "Princess Leia", "Luke Skywalker", "Chewbacca", "Han Solo", "Boba Fett"],
  ["Star Wars 1-3", "Anakin Skywalker", "Count Dooku", "Palpatine", "Jar Jar Binks", "Darth Maul", "ObiWan Kenobi"],
  ["Transformers", "Bumblebee", "Optimus Prime", "Megatron", "Shia Lebouf", "Starscream", "Megan Fox"],
  ["Star Trek", "Captain Kirk", "Spock", "A Klingon", "Scotty", "Nyota Uhura", "Sulu"],
  ["Pirates of the Caribbean", "Jack Sparrow", "Elizabeth Swan", "Will Turner", "Davy Jones", "Hector Barbosa", "The Ship"],
  ["Hunger Games", "Catniss", "Haymitch", "Peeta", "Gayle", "Rue", "Effie Trinket"],
  ["Avengers", "Thanos", "Captain America", "Iron Man", "Black Widow", "Thor", "Hulk"],
  ["Spy Kids", "Carmen Cortez", "Juni Cortez", "Machete", "Donagon Giggles", "The Transmooker", "The Guy"],
  ["Wonder Woman", "Wonder Woman", "Ares God of War", "Steve Trevor", "The Cheetah", "Doctor Poison", "An Amazonian"],
  ["Black Panther", "Black Panther", "Killmonger", "Shuri", "Okoye", "Klaue", "M'Baku"],
  ["Spider Man", "Spider Man", "Docter Octopus", "Green Goblin", "Mary Jane", "Venom", "Aunt May"],
  ["Batman", "Batman", "Alfred", "Catwoman", "The Joker", "Bane", "Robin"],
  ["Indiana Jones", "Indiana Jones", "Sallah", "Short Round", "Marion Ravenwood", "A Nazi", "An Alien"],
  ["The Matrix", "Neo", "Morpheus", "the Oracle", "Trinity", "Cypher", "Agents of the Matrix"],
  ["Terminator", "Terminator", "T-1000", "Sarah Connor", "Skynet", "Kyle Reese", "John Connor"],
  ["Gaurdians of the Galaxy", "Peter Quill", "Rocket Raccoon", "Groot", "Drax the Destroyer", "Nebula", "Gamora"]
]

const movie_question_list = [
  [
    "How would you kill someone, y'know, if you HAD to?",
    "What is your weapon of choice?",
    "Whats your favorite sport and why?",
    "If you were a lawyer, how would you win a case?",
    "Why do people fear you?",
    "How do you deal with haters?"
  ],
  [
    "What do you miss when you have to travel?",
    "How do you show affection in a relationship?",
    "How do you entertain your friends?",
    "What do people admire about you?",
    "What do you like to do in your free time?",
    "What do you do to relax?"
  ],
  [
    "Where is your favorite place to visit?",
    "What is one thing you can't live without?",
    "What was the craziest thing that happened in your past?",
    "What do you want to change about your home?",
    "Whats in your purse?",
    "How do you make money?"
  ]
]

const history_question_list = [
[
    "How often do you travel?",
    "If you were a lawyer, how would you win a case?",
    "What is one thing you can't live without?",
    "How mainstream is your movement?"
  ],
  [
    "How are you funded?",
    "How do you rally your supporters?",
    "What drives you to fight for change?",
    "What gives you hope?"
  ],
  [
    "Where is your favorite place to visit?",
    "What is the biggest challenge you face?",
    "What was the craziest thing that happened in your past?",
    "What do you want to change about your home?",
  ]
]

createGame = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a Game',
    })
  }

  await Game.findOne({ code: body.code }, (err, found) => {
    if (found) {
      return res.status(404).json({
        err,
        message: 'Game code already in use!',
      })
    } else {
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

    if (body.round !== undefined) {
      game.state.set('round', body.round)
    }

    Player.findOne({ name: req.body.name, code: body.code }, (err, p) => {
      if (p !== null) {
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

    Player.remove({ code: game.code }, (err, player) => {
      if (err) {
        return res.status(400).json({ success: false, error: err })
      } else {
        return res.status(200).json({ success: true, data: game })
      }
    })
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

    let movie = undefined

    if (game.theme === "animated") {
      movie = animated_movie_list[Math.floor(Math.random()*animated_movie_list.length)]
      game.movies = animated_movie_list.map(m => m[0])
    } else if (game.theme === "adventure") {
      movie = adventure_movie_list[Math.floor(Math.random()*adventure_movie_list.length)]
      game.movies = adventure_movie_list.map(m => m[0])
    } else if (game.theme === "classic") {
      movie = classic_movie_list[Math.floor(Math.random()*classic_movie_list.length)]
      game.movies = classic_movie_list.map(m => m[0])
    } else if (game.theme === "protestors") {
      movie = protests_list[Math.floor(Math.random()*protests_list.length)]
      game.movies = protests_list.map(m => m[0])
    }

    game.state = { 
      "round": 1, 
      "spy": game.players[Math.floor(Math.random()*game.players.length)],
      "movie": movie[0]
    }

    game.start_time = Date.now()

    game.questions = [
      movie_question_list[0][Math.floor(Math.random()*movie_question_list[0].length)],
      movie_question_list[1][Math.floor(Math.random()*movie_question_list[1].length)],
      movie_question_list[2][Math.floor(Math.random()*movie_question_list[2].length)]
    ]

    if (game.theme === "protestors") {
      game.questions = [
        history_question_list[0][Math.floor(Math.random()*history_question_list[0].length)],
        history_question_list[1][Math.floor(Math.random()*history_question_list[1].length)],
        history_question_list[2][Math.floor(Math.random()*history_question_list[2].length)]
      ]
    }
    game.characters = movie.slice(1, movie.length)
    game
    .save()
    .then(() => {
      let randomStartingIndex;
      randomStartingIndex = Math.floor(Math.random()*game.characters.length)
      game.players.forEach(player_id => {
        Player.findOne({ _id: player_id }, (err, player) => {
          if (player_id == game.state.get('spy')) {
            player.character = "Spy!"
          } else {
            player.character = game.characters[randomStartingIndex % game.characters.length]
          }
          player.answers = []
          player.guesses = []
          randomStartingIndex += 1
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
