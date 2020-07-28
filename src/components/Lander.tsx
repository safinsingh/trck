import React, { useState, useEffect } from 'react'
import {
  Flex,
  Input,
  FormControl,
  Text,
  IconButton,
  Box,
  Button,
  useColorMode,
} from '@chakra-ui/core'
import { Formik, Field, FormikProps } from 'formik'
import { v4 as uuidv4 } from 'uuid'

import { db, auth } from '../firebase/firestore'
import { useHistory } from 'react-router-dom'

interface event {
  [id: string]: { name: string; finished: boolean }
}

interface eventState {
  events: event
}

const Lander = (): JSX.Element => {
  const [state, setState] = useState<any | null>({ events: {} })
  const { colorMode, toggleColorMode } = useColorMode()
  const history = useHistory()

  useEffect(() => {
    if (auth.currentUser) {
      const userDocRef = auth.currentUser.uid
      db.collection(userDocRef)
        .doc('todos')
        .get()
        .then((doc) => {
          if (doc.exists) {
            setState(doc.data())
          } else {
            db.collection(userDocRef).doc('todos').set(state)
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error)
        })
    } else {
      history.push('/login')
    }
  }, [])

  useEffect(() => {
    if (Object.keys(state.events).length !== 0) {
      console.log(state.events)
      if (auth.currentUser) {
        const userDocRef = auth.currentUser!.uid
        db.collection(userDocRef).doc('todos').set(state)
      }
    }
  }, [state])

  const removeItem = (e: any) => {
    const newEvents = state.events
    delete newEvents[e.currentTarget.parentElement.id]

    setState({
      ...state,
      events: newEvents,
    })
  }

  return (
    <Flex
      h="100vh"
      bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}
      align="center"
      justify="center"
    >
      <Flex w="70%" h="100%" justify="center" align="center" direction="column">
        <Button
          onClick={toggleColorMode}
          position="absolute"
          top="10px"
          right="10px"
        >
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        <Box marginY={4}>
          <Text fontSize="6xl" as="b">
            trck.
          </Text>
        </Box>
        <Box>
          <Flex w="100%" justify="center" align="center">
            <Formik
              initialValues={{ newTodo: '' }}
              onSubmit={(values, { resetForm }) => {
                if (values['newTodo']) {
                  setState({
                    events: {
                      ...state.events,
                      [uuidv4()]: { name: values['newTodo'], finished: false },
                    },
                  })
                  resetForm()
                }
              }}
            >
              {(
                props: FormikProps<{
                  newTodo: string
                }>
              ) => (
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
                          bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'}
                          rounded="lg"
                          isLoading
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
            {Object.keys(state.events).length === 0 ? (
              <Text my={1}>No events yet, add one to get started!</Text>
            ) : (
              Object.keys(state.events).map((e, index) => (
                <Flex
                  key={index}
                  id={e}
                  my={1}
                  bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'}
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
                  <Text>{state.events[e].name}</Text>
                  <IconButton
                    aria-label="Search database"
                    icon="delete"
                    variant="ghost"
                    size="sm"
                    onClick={removeItem}
                  />
                </Flex>
              ))
            )}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Lander
