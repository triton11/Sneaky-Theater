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
            theme: 'classic'
        }
    }

    handleChangeInputCode = async event => {
        const code = event.target.validity.valid
            ? event.target.value
            : this.state.code

        this.setState({ code })
    }
    
    handleChangeTheme = async event =>{
        this.setState({theme: event.target.value});
    }

    handleIncludeGame = async () => {
        const { code, theme } = this.state
        console.log(theme)

        const payload = { code, theme }

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

                <Label>Theme: </Label>
                <select value={this.state.theme} onChange={this.handleChangeTheme}>
                    <option value="classic">classic</option>
                    <option value="animated">animated</option>
                    <option value="adventure">adventure</option>
                </select>
                <br></br>

                <Button onClick={this.handleIncludeGame}>Add Game</Button>
                <CancelButton href={'/games/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default GamesInsert