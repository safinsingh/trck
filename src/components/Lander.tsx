import React, { FunctionComponent, useState } from 'react'
import { Box, FormControl, Input } from '@chakra-ui/core'

const Lander: FunctionComponent = () => {
  const [newEvent, setNewEvent] = useState('')

  return (
    <Box h="100%">
      <FormControl h="100%">
        <Input
          h="100%"
          placeholder="add event"
          size="lg"
          value={newEvent}
          onChange={(e: any) => setNewEvent(e.target.value)}
        />
      </FormControl>
    </Box>
  )
}

export default Lander
