import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const Show = styled.div`
    color: #cc0000;
    cursor: pointer;
`

class UpdateGame extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/games/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class ShowGame extends Component {
    showGame = event => {
        event.preventDefault()

        window.location.href = `/games/show/${this.props.id}`
    }

    render() {
        return <Show onClick={this.showGame}>Show</Show>
    }
}

class DeleteGame extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do to want to delete the game ${this.props.id} permanently?`,
            )
        ) {
            api.deleteGameById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class GamesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            games: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllGames().then(games => {
            this.setState({
                games: games.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { games, isLoading } = this.state
        console.log('GamesList -> render -> games', games)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
            },
            {
                Header: 'Code',
                accessor: 'code',
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteGame id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateGame id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <ShowGame id={props.original._id} />
                        </span>
                    )
                },
            }
        ]

        let showTable = true
        if (!games.length) {
            showTable = false
        }

        return (
            <Wrapper>
            {showTable && (
                <ReactTable
                    data={games}
                    columns={columns}
                    loading={isLoading}
                    defaultPageSize={10}
                    minRows={0}
                />
            )}
            </Wrapper>
        )
    }
}

export default GamesList