import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

class GameView extends Component {
	constructor(props) {
        super(props)
        this.state = {
            game_id: this.props.match.params.id,
            name: '',
            players: [],
            columns: [],
            isLoading: false,
        }
    }

 //    componentDidUpdate(prevProps) {
	//   // Typical usage (don't forget to compare props):
	// 	if (this.props.userID !== prevProps.userID) {
	// 		this.fetchData(this.props.userID);
	//   	}
	// }

    render() {
        return (
            <Wrapper>
                HELLOOO
            </Wrapper>
        )
    }
}

export default GameView