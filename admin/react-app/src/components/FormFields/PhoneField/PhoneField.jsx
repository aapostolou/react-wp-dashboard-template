import { Box, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useState } from 'react'

import { countries } from '../../../utils'

import { styles } from './styles'

const PhoneNumber = ({ defaultCountry = 'GR' }) => {
  const [country, setCountry] = useState(
    countries.find((c) => c.code === defaultCountry)
  )

  const handleChange = (e) => {
    setCountry(e.target.value)
  }

  return (
    <Box>
      <TextField
        label="Phone"
        type="number"
        InputProps={{
          startAdornment: (
            <Select
              onChange={handleChange}
              value={country}
              renderValue={() => (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img
                    loading="lazy"
                    width="20"
                    height="13"
                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  <Box>+{country.phone}</Box>
                </Stack>
              )}
              sx={styles.select}
            >
              {countries.map((country) => (
                <MenuItem value={country}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <img
                      loading="lazy"
                      width="20"
                      height="13"
                      src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    <Box>{country.label}</Box>
                    <Box>+{country.phone}</Box>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          ),
          sx: styles.InputProps,
        }}
        sx={styles.textField}
      />
    </Box>
  )
}

export default PhoneNumber
