import React, { Component } from 'react'
import api from '../api'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import styled from 'styled-components'
import Select from 'react-select'


// Who needs seperate files for style/css? Not me!
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 10px 50px 10px 50px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

// This class holds all the functionality for the game.
class GamesShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            game_id: this.props.match.params.id,
            round: 0,
            code: '',
            name: '',
            movie: '',
            movies: [],
            character: '',
            player_id: '',
            spy: '',
            joined: false,
            players: [],
            columns: [],
            questions: [],
            guesses: [],
            answers: [],
            isLoading: false,
            currentQ: 0,
            showGuesses: true
            // Previously used with answer timer
            // cur_time: new Date()
            // start_time: new Date(),
            // seconds: 0,
        }
        this.timer = undefined
        this.gameTimer = 0

        // Early on, I tried including a timer to reveal answers (instead
        // of making it player controlled) but it was too stressful so I 
        // commented it out. Might re-add it at some point.

        // this.startTimer = this.startTimer.bind(this);
        // this.countDown = this.countDown.bind(this);
    }

    handleChangeInputName = async event => {
        const name = event.target.validity.valid
            ? event.target.value
            : this.state.name

        this.setState({ name })
    }

    // Called by getPlayers as part of getGameState
    // Gets saved character/answers/guesses for a newly joined player, otherwise just gets the character
    // (since the character can change after a game reset)
    getPlayerById = async () => {
        const player = this.state.players.find(p => p.name === this.state.name)
        if (player !== undefined) {
            await api.getPlayerById(player._id).then(player_details => {
                // If a player has logged out and rejoins, or joins initially,
                // we need to set the character, player_id, answers and guesses.
                // Otherwise, we just need to set the character
                if (this.state.player_id === '') {
                    this.setState({
                        character: player_details.data.data.character,
                        player_id: player._id,
                        answers: player_details.data.data.answers,
                        guesses: player_details.data.data.guesses,
                    })
                } else {
                    this.setState({
                        character: player_details.data.data.character,
                    })
                }
            })
        } else {
            return undefined
        }
    }

    // Called by getGameState
    getPlayers = async () => {
        await api.getPlayersForRoom(this.state.code).then(players => {
            this.setState({
                players: players.data.data,
                name: this.state.name
            })
            this.getPlayerById()

        })
    }

    // Called when the admin clicks "Reveal Answers"
    handleUpdateGame = async () => {
        const { game_id, code, name, round } = this.state
        const next_round = parseInt(round) + 1
        const payload = { code, name, round: next_round }

        await api.updateGameById(game_id, payload).then(res => {
            this.state.joined = true
        })
    }

    // Called when a player clicks "Join"
    handleJoinGame = async () => {
        const { game_id, code, name } = this.state
        const payload = { code, name }

        await api.updateGameById(game_id, payload).then(res => {
            this.state.joined = true
        })
    }

    // Everytime an answer senses a keystroke, this method updates the entire
    // answers state variable. 
    handleQuestionInput = async(index, event) => {
        var answers = this.state.answers.slice(); // Make a copy of the answers first.
        answers[index] = event.target.value; // Update it with the modified answer.
        this.setState({answers: answers}); // Update the state.
    }

    // Everytime the guess senses a keystroke, this method updates the entire
    // guesses state variable. 
    handleGuessInput = async(index, event) => {
        var guesses = this.state.guesses.slice(); // Make a copy of the guesses first.
        guesses[index] = event.value; // Update it with the modified answer.
        this.setState({guesses: guesses}); // Update the state.
    }

    // Called when the admin clicks "Start" or "Reset" game
    handleStartGame = async () => {
        const { game_id } = this.state

        await api.startGameById(game_id).then(res => {
            window.alert(`Game started successfully`)
            this.setState({
                round: res.data.data.state["round"],
                movie: res.data.data.state["movie"],
                questions: res.data.data.questions,
                // start_time: new Date(res.data.data.start_time),
                spy: res.data.data.state["spy"],
                guesses: [],
                answers: [],
                currentQ: 0
            })            
        })
    }

    // Called when a player clicks "submit answers"
    submitAnswers = async () => {
        const { player_id, answers, guesses, name } = this.state
        const payload = { answers, guesses, name }
        await api.updatePlayerById(player_id, payload).then(res => {
            window.alert(`Submitted successfully`)
            this.getPlayers()
        })
    }

    // Early on, I tried including a timer to reveal answers (instead
    // of making it player controlled) but it was too stressful so I 
    // commented it out. Might re-add it at some point.

    // startTimer() {
    //     if (this.timer == undefined) {
    //         this.setState({
    //             seconds: 120 - Math.round((this.state.cur_time.valueOf() - this.state.start_time.valueOf())/1000.0)
    //         })
    //         this.timer = setInterval(this.countDown, 1000);
    //     }
    // }
    // countDown() {
    //     // Remove one second, set state so a re-render happens.
    //     let seconds = this.state.seconds - 1;
    //     // Check if we're at zero.
    //     this.setState({
    //         seconds: seconds,
    //     });
    //     if (seconds < -5) {
    //         this.setState({
    //             round: 2
    //         })
    //         clearInterval(this.timer);
    //         this.handleUpdateGame();
    //     }
    // }

    // Cycle to the previous question when a player clicks "Previous Question"
    showPreviousQuestion = async () => {
        let oldQ = this.state.currentQ
        if (oldQ === 0) {
            this.setState({
                currentQ: 2,
            });
        } else {
            this.setState({
                currentQ: oldQ - 1,
            });
        }
    }

    // Cycle to the next question when a player clicks "Next Question"
    toggleShowGuesses = async () => {
        let oldShowGuesses = this.state.showGuesses;
        this.setState({
            showGuesses: !(oldShowGuesses)
        });
    }

    // This method is triggered every 5 seconds, and gets the game state
    // including the other player's answers.
    getGameState = async () => {
        await api.getGameById(this.props.match.params.id).then(game => {
            // If its the first round, reset answers and questions locally. We will reset
            // character in getPlayerById, which is called after getPlayers.
            // Otherwise, just set the currentQ.
            if ((game.data.data.state["round"] !== this.state.round) && (game.data.data.state["round"] <= 1)) {
                this.setState({
                    answers: [],
                    guesses: [],
                    currentQ: 0
                })
            } else if ((game.data.data.state["round"] !== this.state.round) && (game.data.data.state["round"]%2 == 0)) {
                this.setState({
                    currentQ: ((parseInt(game.data.data.state["round"])) / 2 - 1)
                })
            }
            this.setState({
                code: game.data.data.code,
                round: game.data.data.state["round"],
                // start_time: new Date(game.data.data.start_time),
                movie: game.data.data.state["movie"],
                questions: game.data.data.questions,
                spy: game.data.data.state["spy"],
                movies: game.data.data.movies,
                isLoading: false,
                // cur_time: new Date()
            })
            this.getPlayers();
        })
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        this.getGameState()
        // Pull in fresh data for the game state every 1 seconds
        this.gameTimer = setInterval(this.getGameState, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.gameTimer)
    }

    render() {
        const { round, code, name, player_id, players, movie, movies, character, spy, joined, questions, answers, isLoading, currentQ, guesses, showGuesses } = this.state

        let columns = [
            {
                Header: 'Name',
                accessor: 'name',
            }
        ]

        let joinView;
        // Only show the join view if the player is not in the game yet
        if (joined === false) {
            joinView = 
                <div>
                    <InputText
                        type="text"
                        value={name}
                        placeholder="Enter name"
                        onChange={this.handleChangeInputName}
                    />
                    <Button onClick={this.handleJoinGame}>Join Game</Button>
                </div>
        } else {
            // joinView = 
            //     <div align="center">
            //         Welcome {name}
            //     </div>
        }

        let mainView;

        const listMovies = movies.map((m, index) =>
                <div key={index}>
                    <input type="checkbox"></input> {m}
                </div>
            );

        const spyInfo = 
                <div>
                    <Label>You are the spy!</Label>
                </div>
        const playerInfo = <div><Label>The movie is: {movie}</Label><br></br><Label>You are: {character}</Label></div>

        // This logic either shows the player their character and the movie,
        // or shows the spy a list of all the possible movies to choose from.
        const movieOrSpy = (spy === player_id) ? spyInfo : playerInfo

        const guessWho = (spy === player_id) ? "Guess the movie!" : "Guess who the spy is!"

        const guessOptions = (spy === player_id) ? 
            movies.map(m => ({"value": m, "label": m})) : 
            players.map(p => ({"value": p.name, "label": p.name}))

        // This logic shows the editable answer text boxes if its round 1
        // or adds everyone's answers to the player names table if its
        // round 2.
        if (joined === true && (round == 1 || round == 3 || round == 5)) {

            // Used only in the timer version
            // this.startTimer()
            
            const listQuestions = 
                <div>
                    <Label> {questions[(round - 1)/2]} </Label>
                    <br></br>
                    <InputText
                        type="text"
                        value={answers[(round - 1)/2] || ''}
                        onChange={this.handleQuestionInput.bind(this, (round - 1)/2)}
                    />
                </div>

            // Again, used only in the timer version
            // const secondsOrZero = (seconds < 0) ? 0 : seconds;
        
            mainView = 
                <div>
                    {movieOrSpy}
                    <br></br>
                    <div>
                        <Label> Question {((round - 1)/2)+1}: </Label>
                        {listQuestions}
                        <Button onClick={this.submitAnswers}>Submit Answers</Button>
                    </div>
                </div>
        } else if (joined === true && (round == 2 || round == 4 || round == 6)) {
            columns = [
                {
                    Header: 'Name',
                    accessor: 'name',
                    minWidth: 200,
                    maxWidth: 300,
                },
                {
                    Header: questions[currentQ],
                    accessor: `answers[${currentQ}]`,
                    style: { 'whiteSpace': 'unset' }
                }
            ]
            // Used to be above the graph, but removed for now
            // Edit: Re-added 3/13/2021
            const previousQuestionButton = <Button onClick={this.showPreviousQuestion}>Previous Question</Button>
            mainView =
                <div>
                    {movieOrSpy}
                    <div>
                        <br></br>
                        <Label> {guessWho} </Label>
                        <br></br>
                        <Select options={guessOptions} onChange={this.handleGuessInput.bind(this, round/2 - 1)} />
                        <Button onClick={this.submitAnswers}>Submit Guesses</Button>
                        {previousQuestionButton}
                    </div>
                </div>
        } else if (joined === true && (round == 7)) {
            const spyName = players.filter(function(p) { return p._id === spy; })[0];
            const youWin = (player_id === spy && guesses[guesses.length - 1] === movie) || (guesses[guesses.length - 1] === spyName.name)
            const toggle = <Button onClick={this.toggleShowGuesses}>Toggle Guesses / Answers</Button>
            joinView = youWin ? <div><h2 align='center'>You win!</h2>{toggle}</div> : <div><h2 align='center'>You lost!</h2> {toggle} </div>
            mainView = <p> The movie was {movie}. </p>
            const guessColumns = [
                {
                    Header: 'Name',
                    accessor: 'name',
                    minWidth: 50,
                    maxWidth: 200
                },
                {
                    Header: 'Character',
                    accessor: 'character',
                    style: { 'whiteSpace': 'unset' }
                },
                {
                    Header: questions[0],
                    accessor: `guesses[0]`,
                    style: { 'whiteSpace': 'unset' }
                },
                {
                    Header: questions[1],
                    accessor: `guesses[1]`,
                    style: { 'whiteSpace': 'unset' }
                },
                {
                    Header: questions[2],
                    accessor: `guesses[2]`,
                    style: { 'whiteSpace': 'unset' }
                }
            ]
            const answerColumns = [
                {
                    Header: 'Name',
                    accessor: 'name',
                    minWidth: 50,
                    maxWidth: 200
                },
                {
                    Header: 'Character',
                    accessor: 'character',
                    style: { 'whiteSpace': 'unset' }
                },
                {
                    Header: questions[0],
                    accessor: `answers[0]`,
                    style: { 'whiteSpace': 'unset' }
                },
                {
                    Header: questions[1],
                    accessor: `answers[1]`,
                    style: { 'whiteSpace': 'unset' }
                },
                {
                    Header: questions[2],
                    accessor: `answers[2]`,
                    style: { 'whiteSpace': 'unset' }
                }
            ]
            columns = showGuesses ? guessColumns : answerColumns;
        } else {
            mainView =
                <div>
                </div>
        }

        const waitingOn = players.filter(function(p) { 
            if (round % 2 == 1) {
                return (p.answers[(round - 1)/2] == null)
            } else {
                return (p.guesses[round/2 - 1] == null)
            }
        }).map(x => x.name + ", ")

        // The first player that joins is the admin. Only they get access to the 
        // "Reset/Start Game" button and the "Reveal Answers" button.
        let adminView;
        if (!(players[0] === undefined)) {
            if (players[0]._id === player_id) {
                if (round >= 7) {
                    adminView = 
                    <div>
                        <Button onClick={this.handleStartGame}>Reset Game</Button>
                    </div>
                } else if (round == 0 || round == null){
                    adminView = 
                        <div>
                            <Button onClick={this.handleStartGame}>Start Game</Button>
                        </div>
                } else {
                    adminView = 
                        <div>
                            <Button onClick={this.handleUpdateGame}>Next Round</Button>
                        </div>
                }
            }
        }
        return (
            <Wrapper>
                <Title>Room {code}</Title>

                {joinView}

                {mainView}
                <ReactTable
                    data={players}
                    columns={columns}
                    loading={isLoading}
                    defaultPageSize={10}
                    minRows={0}
                    width='600px'
                    showPagination={false}
                />
                <div>
                    <Label>
                        Waiting on: {waitingOn}
                    </Label>
                </div>

                {adminView}
            </Wrapper>
        )
    }
}

export default GamesShow