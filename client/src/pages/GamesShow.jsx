import React, { Component } from 'react'
import api from '../api'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import styled from 'styled-components'

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
            answers: [],
            isLoading: false,
            currentQ: 0
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
    getPlayerById = async () => {
        const player = this.state.players.find(p => p.name === this.state.name)
        if (player !== undefined) {
            await api.getPlayerById(player._id).then(player_details => {
                this.setState({
                    character: player_details.data.data.character,
                    player_id: player._id,
                    // answers: player_details.data.data.answers,
                })
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
        const { game_id, code, name } = this.state
        const round = 2
        const payload = { code, name, round }

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
                answers: [],
                currentQ: 0
            })            
        })
    }

    // Called when a player clicks "submit answers"
    submitAnswers = async () => {
        const { player_id, answers, name } = this.state
        const payload = { answers, name }
        await api.updatePlayerById(player_id, payload).then(res => {
            window.alert(`Answers submitted successfully`)
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

    // Cycle to the next question when a player clicks "Next Question"
    showNextQuestion = async () => {
        let oldQ = this.state.currentQ
        if (oldQ === 2) {
            this.setState({
                currentQ: 0,
            });
        } else {
            this.setState({
                currentQ: oldQ + 1,
            });
        }
    }

    // This method is triggered every 5 seconds, and gets the game state
    // including the other player's answers.
    getGameState = async () => {
        await api.getGameById(this.props.match.params.id).then(game => {
            if (game.data.data.state["round"] !== this.state.round) {
                this.setState({
                    answers: [],
                    currentQ: 0
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
        // Pull in fresh data for the game state every 5 seconds
        this.gameTimer = setInterval(this.getGameState, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.gameTimer)
    }

    render() {
        const { round, code, name, player_id, players, movie, movies, character, spy, joined, questions, answers, isLoading, currentQ } = this.state

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
                        onChange={this.handleChangeInputName}
                    />
                    <Button onClick={this.handleJoinGame}>Join Game</Button>
                </div>
        } else {
            joinView = 
                <div align="center">
                    Welcome {name}
                </div>
        }

        let mainView;

        const listMovies = movies.map((m, index) =>
                <div key={index}>
                    <input type="checkbox"></input> {m}
                </div>
            );

        const spyInfo = 
                <div>
                    <Label>You are the spy! Here are the possible movies:</Label>
                    {listMovies}
                </div>
        const playerInfo = <div><Label>The movie is: {movie}</Label><br></br><Label>You are: {character}</Label></div>

        // This logic either shows the player their character and the movie,
        // or shows the spy a list of all the possible movies to choose from.
        const movieOrSpy = (spy === player_id) ? spyInfo : playerInfo

        // This logic shows the editable answer text boxes if its round 1
        // or adds everyone's answers to the player names table if its
        // round 2.
        if (joined === true && round == 1) {

            // Used only in the timer version
            // this.startTimer()
            
            const listQuestions = questions.map((q, index) =>
                <li key={index}>
                    {q}
                    <br></br>
                    <InputText
                        type="text"
                        value={answers[index] || ''}
                        onChange={this.handleQuestionInput.bind(this, index)}
                    />
                </li>
            );

            // Again, used only in the timer version
            // const secondsOrZero = (seconds < 0) ? 0 : seconds;
        
            mainView = 
                <div>
                    {movieOrSpy}
                    <div>
                        Questions:
                        {listQuestions}
                        <Button onClick={this.submitAnswers}>Submit Answers</Button>
                    </div>
                </div>
        } else if (joined === true && round == 2) {
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
            mainView =
                <div>
                    {movieOrSpy}
                    <Button onClick={this.showNextQuestion}>Next Question</Button>
                </div>
        } else {
            mainView =
                <div>
                </div>
        }

        // The first player that joins is the admin. Only they get access to the 
        // "Reset/Start Game" button and the "Reveal Answers" button.
        let adminView;
        if (!(players[0] === undefined)) {
            if (players[0]._id === player_id) {
                if (round == 2) {
                    adminView = 
                    <div>
                        <CancelButton href={'/games/list'}>List</CancelButton>
                        <Button onClick={this.handleStartGame}>Reset Game</Button>
                    </div>
                } else {
                    adminView = 
                        <div>
                            <CancelButton href={'/games/list'}>Cancel</CancelButton>
                            <Button onClick={this.handleStartGame}>Start Game</Button>
                            <Button onClick={this.handleUpdateGame}>Reveal All Answers</Button>
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
                />

                {adminView}
            </Wrapper>
        )
    }
}

export default GamesShow