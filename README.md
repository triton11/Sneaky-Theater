# Sneaky Theater

Sneaky Theater is a social deduction game that combines [spyfall](https://www.spyfall.app/), [Fakin It](https://www.jackboxgames.com/fakin-it/), and movie knoweledge.

## Instructions:
* To create a new game, click new game. Choose a movie category and room name.
* To join an existing game, type the room name into the text box on the main page and click join game.
* The first person to join each game is the Admin. The admin can choose when to start the game, and when to move to the next round. 
* When the game is started, every player except for one will be assigned a character from the same movie. The remaining player is the spy, and they
will not be given any information about the movie nor the characters. Each player including the spy will be asked to answer the same question. When the admin
clicks next round, players will be able to see eachother's answers, and guess who the spy is. The spy will get to guess the movie.
* After three rounds of questions and guesses, the game ends. If you guess the spy, you win! However, if the spy guesses the movie, then they win too! 
You can also view everyone's guesses and answers.
* The admin can restart the game, or make a new room to try a different category of movies!

## Movie / Character Lists:
Item 1 in each sublist represents the movie, and items 2-7 in each list represent the playable characters for that movie.
```
animated_movie_list = [
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

classic_movie_list = [
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

adventure_movie_list = [
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
```
