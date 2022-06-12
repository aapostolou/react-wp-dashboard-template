import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material/'

import { useTheme } from '../../customization'

const CustomThemeProvider = ({ customTheme = {}, children }) => {
  const theme = useTheme(customTheme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default CustomThemeProvider
