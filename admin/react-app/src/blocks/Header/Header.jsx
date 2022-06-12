import { withProps } from '../../models/lib'
import {
  changeToLightMode,
  changeToDarkMode,
  themeMode,
} from '../../models/general'

import { AppBar, Box, Stack, Toolbar, Container } from '@mui/material'
import { LanguagePicker } from '../../containers'
import { ThemeModeSwitch } from '../../components'

import { styles } from './styles'

const Header = ({ changeToLightMode, changeToDarkMode, themeMode }) => {
  const handleThemeChange = (newTheme) => {
    if (newTheme === 'light') {
      changeToLightMode()
    } else {
      changeToDarkMode()
    }
  }

  return (
    <AppBar position="static">
      <Toolbar sx={styles.toolbar}>
        <Container maxWidth="lg" sx={styles.container}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box></Box>
            <Box sx={{ flex: 1 }}></Box>
            <Box>
              <Stack direction="row" alignItems="center">
                <LanguagePicker />
                <ThemeModeSwitch
                  isChecked={themeMode === 'dark'}
                  onChange={handleThemeChange}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default withProps({ changeToLightMode, changeToDarkMode, themeMode })(
  Header
)
