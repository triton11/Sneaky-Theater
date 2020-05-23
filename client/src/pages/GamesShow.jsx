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
            players: [],
            columns: [],
            isLoading: false,
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.validity.valid
            ? event.target.value
            : this.state.name

        this.setState({ name })
    }

    getPlayers = async () => {
        await api.getPlayersForRoom(this.state.code).then(players => {
            this.setState({
                players: players.data.data,
                name: this.state.name
            })
        })
    }

    handleUpdateGame = async () => {
        const { game_id, code, name } = this.state
        const payload = { code, name }

        await api.updateGameById(game_id, payload).then(res => {
            window.alert(`Game joined successfully`)
            this.getPlayers()
        })
    }

    handleStartGame = async () => {
        const { game_id } = this.state

        await api.startGameById(game_id).then(res => {
            window.alert(`Game started successfully`)
            this.setState({
                round: res.data.data.state["round"]
            })
            this.getPlayers()
        })
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        console.log(this.props)

        await api.getGameById(this.props.match.params.id).then(game => {
            this.setState({
                round: game.data.data.state["round"],
                code: game.data.data.code,
                isLoading: false,
            })
            this.getPlayers();
        })
    }

    render() {
        const { round, code, name, players, isLoading } = this.state

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
            }
        ]

        let joinView;
        if (!(players.map(p => p.name).includes(name))) {
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
                    Welcome
                    <InputText
                        type="text"
                        value={name}
                        onChange={this.handleChangeInputName}
                    />
                </div>
        }

        const isStarted = round > 0
        let mainView;
        if (isStarted) {
            mainView = 
                <Wrapper>
                    <Title>Game Room</Title>

                    <Label>Code: {code}</Label>

                    <ReactTable
                        data={players}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        minRows={0}
                    />
                </Wrapper>
        } else {
            mainView = 
                <Wrapper>
                    <Title>Game Room</Title>

                    <Label>Code: {code}</Label>

                    {joinView}

                    <ReactTable
                        data={players}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        minRows={0}
                    />
                    
                    <CancelButton href={'/games/list'}>Cancel</CancelButton>
                    <Button onClick={this.handleStartGame}>Start Game</Button>
                </Wrapper>
        }
        return (
            <div>
                {mainView}
            </div>
        )
    }
}

export default GamesShow