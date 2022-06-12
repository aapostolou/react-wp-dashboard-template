import { useEffect, useState } from 'react'
import { onEnterPressed } from '../../../utils'

import { withProps } from '../../../models/lib'
import {
  logIn,
  validateToken,
  hasPassedInitialValidation,
} from '../../../models/user'

import { useTranslation } from '../../TranslationsProvider'

import { Box, Button, Stack, TextField } from '@mui/material'

import { styles } from './styles'

const LoginForm = ({
  logIn,
  validateToken,
  hasPassedInitialValidation,
  sx = {},
}) => {
  const { translate } = useTranslation()

  const [username, setUsername] = useState()
  const [password, sePassword] = useState()

  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleChangePassword = (e) => {
    sePassword(e.target.value)
  }

  const handleSubmitButton = () => {
    if (canSubmit) logIn({ username, password })
  }

  const canSubmit = username?.length > 2 && password?.length > 2

  onEnterPressed(handleSubmitButton, [canSubmit, username, password])

  useEffect(() => {
    validateToken()
  }, [])

  return (
    <Box sx={{ ...styles.container, ...sx }}>
      {hasPassedInitialValidation && (
        <Stack spacing={2} sx={styles.stack}>
          <TextField
            label={translate('USERNAME')}
            size="small"
            onChange={handleChangeUsername}
          />
          <TextField
            label={translate('PASSWORD')}
            size="small"
            type="password"
            onChange={handleChangePassword}
          />
          <Button
            variant="contained"
            disabled={!canSubmit}
            onClick={handleSubmitButton}
          >
            {translate('LOGIN_SUBMIT_BUTTON')}
          </Button>
        </Stack>
      )}
    </Box>
  )
}

export default withProps({ logIn, validateToken, hasPassedInitialValidation })(
  LoginForm
)
