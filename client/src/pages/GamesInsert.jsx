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

class GamesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            code: '',
        }
    }

    handleChangeInputCode = async event => {
        const code = event.target.validity.valid
            ? event.target.value
            : this.state.code

        this.setState({ code })
    }

    handleIncludeGame = async () => {
        const { code } = this.state
        const payload = { code }

        await api.insertGame(payload).then(res => {
            window.alert(`Game inserted successfully`)
            this.setState({
                code: ''
            })
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

                <Button onClick={this.handleIncludeGame}>Add Game</Button>
                <CancelButton href={'/games/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default GamesInsert