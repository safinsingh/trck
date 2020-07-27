import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

ReactDOM.render(
  <Router>
    <ThemeProvider>
      <CSSReset />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
)
