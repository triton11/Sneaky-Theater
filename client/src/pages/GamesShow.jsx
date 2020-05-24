import React, { Component } from 'react'
import api from '../api'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

import styled from 'styled-components'

import GameView from './GameView'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
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

class GamesShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            game_id: this.props.match.params.id,
            round: '',
            code: '',
            name: '',
            movie: '',
            character: '',
            player_id: '',
            spy: '',
            joined: false,
            players: [],
            columns: [],
            questions: [],
            answers: [],
            isLoading: false,
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.validity.valid
            ? event.target.value
            : this.state.name

        this.setState({ name })
    }

    getPlayerById = async () => {
        const player = this.state.players.find(p => p.name === this.state.name)
        if (player !== undefined) {
            await api.getPlayerById(player._id).then(player_details => {
                this.setState({
                    character: player_details.data.data.character,
                    player_id: player._id,
                    answers: player_details.data.data.answers,
                })
            })
        } else {
            return undefined
        }
    }

    getPlayers = async () => {
        await api.getPlayersForRoom(this.state.code).then(players => {
            this.setState({
                players: players.data.data,
                name: this.state.name
            })
            this.getPlayerById()
        })
    }

    handleUpdateGame = async () => {
        const { game_id, code, name } = this.state
        const payload = { code, name }

        await api.updateGameById(game_id, payload).then(res => {
            window.alert(`Game joined successfully`)
            this.getPlayers()
            this.state.joined = true
        })
    }

    handleQuestionInput = async(index, event) => {
        var answers = this.state.answers.slice(); // Make a copy of the emails first.
        answers[index] = event.target.value; // Update it with the modified email.
        this.setState({answers: answers}); // Update the state.
    }

    handleStartGame = async () => {
        const { game_id } = this.state

        await api.startGameById(game_id).then(res => {
            window.alert(`Game started successfully`)
            this.setState({
                round: res.data.data.state["round"],
                movie: res.data.data.state["movie"],
                questions: res.data.data.questions,
                spy: res.data.data.state["spy"]
            })
            this.getPlayers()
        })
    }

    submitAnswers = async () => {
        const { player_id, answers, name } = this.state
        const payload = { answers, name }
        await api.updatePlayerById(player_id, payload).then(res => {
            window.alert(`Answers submitted successfully`)
            this.getPlayers()
        })
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getGameById(this.props.match.params.id).then(game => {
            this.setState({
                code: game.data.data.code,
                round: game.data.data.state["round"],
                movie: game.data.data.state["movie"],
                questions: game.data.data.questions,
                spy: game.data.data.state["spy"],
                isLoading: false,
            })
            this.getPlayers();
        })
    }

    render() {
        const { round, code, name, player_id, players, movie, character, spy, joined, questions, answers, isLoading } = this.state

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
            }
        ]

        let joinView;
        if (joined === false) {
            joinView = 
                <div>
                    <InputText
                        type="text"
                        value={name}
                        onChange={this.handleChangeInputName}
                    />
                    <Button onClick={this.handleUpdateGame}>Join Game</Button>
                </div>
        } else {
            joinView = 
                <div align="center">
                    Welcome {name}
                </div>
        }

        const isStarted = round > 0
        let mainView;
        if (isStarted && joined === true) {
            const listQuestions = questions.map((q, index) =>
                <li key={index}>
                    {q}
                    <br></br>
                    <InputText
                        type="text"
                        value={answers[index]}
                        onChange={this.handleQuestionInput.bind(this, index)}
                    />
                </li>
            );
            const playerInfo = <div><Label>The movie is: {movie}</Label> <Label>You are: {character}</Label></div>
            const movieOrSpy = (spy === player_id) ? <Label>You are the Spy</Label> : playerInfo
            mainView = 
                <div>
                    {movieOrSpy}
                    <div>
                        Questions:
                        {listQuestions}
                        <Button onClick={this.submitAnswers}>Submit Answers</Button>
                    </div>
                </div>
        } else {
            mainView =
                <div>
                    <CancelButton href={'/games/list'}>Cancel</CancelButton>
                    <Button onClick={this.handleStartGame}>Start Game</Button>
                </div>
        }
        return (
            <Wrapper>
                <Title>Game Room</Title>

                <Label>Code: {code}</Label>

                {joinView}

                {mainView}

                <ReactTable
                    data={players}
                    columns={columns}
                    loading={isLoading}
                    defaultPageSize={10}
                    minRows={0}
                />
            </Wrapper>
        )
    }
}

export default GamesShow