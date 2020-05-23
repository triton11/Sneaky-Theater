import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { GamesList, GamesInsert, GamesUpdate, GamesShow } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/games/list" exact component={GamesList} />
                <Route path="/games/create" exact component={GamesInsert} />
                <Route path="/games/update/:id" exact component={GamesUpdate} />
                <Route path="/games/show/:id" exact component={GamesShow} />
            </Switch>
        </Router>
    )
}

export default App