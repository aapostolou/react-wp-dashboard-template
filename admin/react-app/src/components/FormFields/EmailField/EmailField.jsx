import { useState } from 'react'

import { emailValidation } from '../../../utils'

import { TextField } from '@mui/material'
import { useTranslation } from '../../TranslationsProvider'

const EmailField = ({ onChange, validation, helperText, ...rest }) => {
  const { translate } = useTranslation()

  const [isValid, setValid] = useState(true)

  const handleChange = (e) => {
    const value = e.target.value

    setValid(validation?.(value) ?? emailValidation(value))

    onChange?.(e)
  }

  return (
    <TextField
      onChange={handleChange}
      error={!isValid}
      helperText={!isValid && (helperText || translate('EMAIL_FIELD_ERROR'))}
      {...rest}
    />
  )
}

export default EmailField
