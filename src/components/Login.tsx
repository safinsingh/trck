import React from 'react'
import { Flex, Input, Text, Box, Button, useColorMode } from '@chakra-ui/core'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useHistory } from 'react-router-dom'

import { auth } from '../firebase/firestore'

const Login = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode()

  const history = useHistory()

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
        <Box marginY={2}>
          <Text fontSize="6xl" as="b">
            trck.
          </Text>
        </Box>
        <Box>
          <Flex w="100%" justify="center" align="center">
            <Formik
              initialValues={{ email: '', pass: '' }}
              onSubmit={(values, { resetForm }) => {
                auth
                  .createUserWithEmailAndPassword(
                    values['email'],
                    values['pass']
                  )
                  .then(() => history.push('/'))
                  .catch((error) => {
                    const login = error.code === 'auth/email-already-in-use'
                    if (login) {
                      auth
                        .signInWithEmailAndPassword(
                          values['email'],
                          values['pass']
                        )
                        .then(() => history.push('/'))
                        .catch((err) => {
                          alert(err)
                          resetForm()
                        })
                    } else {
                      alert(error)
                    }

                    resetForm()
                  })
              }}
              validate={(values) => {
                const errors: any = {}
                if (!values.email) {
                  errors.email = 'Required'
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address'
                }
                return errors
              }}
            >
              {() => (
                <Form style={{ width: '80%' }}>
                  <Field name="email" w="100%">
                    {({ field }: { field: string }) => (
                      <>
                        <Input
                          {...field}
                          placeholder="email"
                          id="email"
                          size="lg"
                          w="100%"
                          my={2}
                          padding="10px"
                          variant="filled"
                          bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'}
                          rounded="lg"
                        />
                        <ErrorMessage name="email" component="div" />
                      </>
                    )}
                  </Field>
                  <Field name="pass" tyoe="password" w="100%">
                    {({ field }: { field: string }) => (
                      <Input
                        {...field}
                        placeholder="pass"
                        type="password"
                        id="pass"
                        size="lg"
                        w="100%"
                        my={2}
                        padding="10px"
                        variant="filled"
                        bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'}
                        rounded="lg"
                      />
                    )}
                  </Field>
                  <Button
                    type="submit"
                    bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'}
                    w="100%"
                    size="lg"
                    rounded="lg"
                    padding="10px"
                  >
                    log in
                  </Button>
                </Form>
              )}
            </Formik>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Login
