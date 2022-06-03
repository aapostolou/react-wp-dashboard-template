import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material/'

import { useTheme } from '../../customization'

const CustomThemeProvider = ({ children }) => {
  const theme = useTheme({})

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default CustomThemeProvider
