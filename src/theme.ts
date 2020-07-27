import { theme } from '@chakra-ui/core'

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: 'Inter, sans-serif',
    heading: 'Inter, serif',
  },
}

export default customTheme
