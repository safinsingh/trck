import React, { Component } from 'react'
import {
  Flex,
  Input,
  FormControl,
  Text,
  IconButton,
  Box,
} from '@chakra-ui/core'
import { Formik, Field } from 'formik'
import { v4 as uuidv4 } from 'uuid'

interface event {
  [id: string]: { name: string; finished: boolean }
}

interface state {
  events: event
}

class Lander extends Component {
  state: state = { events: {} }

  removeItem = (e: any) => {
    const newEvents = this.state.events
    delete newEvents[e.currentTarget.parentElement.id]

    this.setState({
      ...this.state,
      events: newEvents,
    })
  }

  render(): JSX.Element {
    return (
      <Flex w="70%" h="100%" justify="center" align="center" direction="column">
        <Box marginY={6}>
          <Text fontSize="6xl" as="b">
            trck.
          </Text>
        </Box>
        <Box>
          <Flex w="100%" justify="center" align="center">
            <Formik
              initialValues={{ newTodo: '' }}
              onSubmit={(values, { resetForm }) => {
                this.setState({
                  events: {
                    ...this.state.events,
                    [uuidv4()]: { name: values['newTodo'], finished: false },
                  },
                })
                resetForm()
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit} style={{ width: '80%' }}>
                  <Field name="newTodo" w="100%">
                    {({ field }: { field: string }) => (
                      <FormControl w="100%">
                        <Input
                          {...field}
                          placeholder="Add Todo"
                          id="newTodo"
                          size="lg"
                          w="100%"
                          padding="10px"
                          variant="filled"
                          bg="gray.800"
                          rounded="lg"
                        />
                      </FormControl>
                    )}
                  </Field>
                </form>
              )}
            </Formik>
          </Flex>
          <Flex
            w="100%"
            justify="center"
            align="center"
            direction="column"
            my={4}
          >
            {Object.keys(this.state.events).length === 0 ? (
              <Text my={1}>No events yet, add one to get started!</Text>
            ) : (
              Object.keys(this.state.events).map((e, index) => (
                <Flex
                  key={index}
                  id={e}
                  my={1}
                  bg="gray.800"
                  w="80%"
                  padding="10px"
                  rounded="lg"
                  align="center"
                  justify="space-between"
                >
                  <IconButton
                    aria-label="Search database"
                    icon="delete"
                    size="sm"
                    opacity={0}
                    cursor="none"
                  />
                  <Text>{this.state.events[e].name}</Text>
                  <IconButton
                    aria-label="Search database"
                    icon="delete"
                    variant="ghost"
                    size="sm"
                    onClick={this.removeItem}
                  />
                </Flex>
              ))
            )}
          </Flex>
        </Box>
      </Flex>
    )
  }
}

export default Lander
