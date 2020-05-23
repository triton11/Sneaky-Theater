import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

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

class GamesUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            code: '',
        }
    }

    handleChangeInputCode = async event => {
        const code = event.target.validity.valid
            ? event.target.value
            : this.state.code

        this.setState({ code })
    }

    handleUpdateGame = async () => {
        const { id, code} = this.state
        const payload = { code }

        await api.updateGameById(id, payload).then(res => {
            window.alert(`Game updated successfully`)
            this.setState({
                code: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const game = await api.getGameById(id)

        this.setState({
            code: game.data.data.code,
        })
    }

    render() {
        const { code } = this.state
        return (
            <Wrapper>
                <Title>Create Game</Title>

                <Label>Code: </Label>
                <InputText
                    type="text"
                    value={code}
                    onChange={this.handleChangeInputCode}
                />

                <Button onClick={this.handleUpdateGame}>Update Game</Button>
                <CancelButton href={'/games/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default GamesUpdate