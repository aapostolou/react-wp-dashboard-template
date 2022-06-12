import { useTranslation } from '../TranslationsProvider'

import { Box, Switch, Tooltip } from '@mui/material'

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import { styles } from './styles'

const ThemeModeSwitch = ({ isChecked, onChange }) => {
  const { translate } = useTranslation()

  const handleChange = (e) => {
    onChange?.(e.target.checked ? 'dark' : 'light')
  }

  return (
    <Tooltip
      title={translate('THEME_MODE_SWITCH_TOOLTIP', {
        targetMode: isChecked ? 'light' : 'dark',
      })}
    >
      <Switch
        defaultChecked={isChecked}
        color="default"
        icon={
          <Box className="MuiSwitch-thumb">
            <LightModeIcon color="warning" fontSize="small" />
          </Box>
        }
        checkedIcon={
          <Box className="MuiSwitch-thumb">
            <DarkModeIcon color="warning" fontSize="small" />
          </Box>
        }
        sx={styles.switch}
        onChange={handleChange}
      />
    </Tooltip>
  )
}

export default ThemeModeSwitch
