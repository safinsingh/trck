import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import customTheme from './theme'

ReactDOM.render(
  <Router>
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <CSSReset />
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ColorModeProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
)
