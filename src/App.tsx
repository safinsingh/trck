import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/core'

import Lander from './components/Lander'

const App: FunctionComponent = () => {
  return (
    <Box h="100vh">
      <Switch>
        <Route exact path="/" component={Lander} />
      </Switch>
    </Box>
  )
}

export default App
