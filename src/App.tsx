import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router-dom'

import Lander from './components/Lander'

const App: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/" component={Lander} />
    </Switch>
  )
}

export default App
