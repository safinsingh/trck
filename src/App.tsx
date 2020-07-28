import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router-dom'

import Lander from './components/Lander'
import Login from './components/Login'

const App: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/" component={Lander} />
      <Route exact path="/login" component={Login} />
    </Switch>
  )
}

export default App
