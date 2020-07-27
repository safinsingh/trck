import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Flex } from '@chakra-ui/core'

import Lander from './components/Lander'

const App: FunctionComponent = () => {
  return (
    <Flex h="100vh" bg="gray.900" align="center" justify="center">
      <Switch>
        <Route exact path="/" component={Lander} />
      </Switch>
    </Flex>
  )
}

export default App
