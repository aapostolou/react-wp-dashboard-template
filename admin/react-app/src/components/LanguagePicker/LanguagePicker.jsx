import { useEffect, useState } from 'react'

import { useTranslation } from '../TranslationsProvider'

import { Box, Tooltip } from '@mui/material'

import { countries } from '../../utils'

import { styles } from './styles'

const LanguagePicker = ({
  languages = [],
  selectedLanguage,
  direction = 'down',
  tooltipsDirection,
  onChange,
  sx,
}) => {
  const { translate } = useTranslation()

  const [isOpen, setOpen] = useState()
  const [sortedLanguages, setSortedLanguages] = useState([])

  const sortLanguages = () => {
    setSortedLanguages(
      [...languages]
        .sort((a) => (a === selectedLanguage ? -1 : 1))
        .map((lang) => countries.find((c) => c.code === lang))
    )
  }

  const handleFlagClick = (lang) => {
    if (isOpen) {
      if (selectedLanguage === lang) {
        setOpen(false)
      } else {
        onChange?.(lang)
      }
    } else {
      setOpen(true)
    }
  }

  const getTooltipsDirection = () => {
    if (tooltipsDirection) return tooltipsDirection

    if (direction === 'down' || direction === 'up') {
      return 'right'
    } else {
      return 'bottom'
    }
  }

  useEffect(() => {
    setOpen(false)
    setTimeout(sortLanguages, 300)
  }, [selectedLanguage])

  return (
    <Box sx={{ ...styles.container, ...sx }}>
      {sortedLanguages.map((country, i) => (
        <Tooltip
          key={country.code}
          title={
            isOpen
              ? country.code
              : i === 0
              ? translate('SELECT_LANGUAGE_TOOLTIP')
              : ''
          }
          placement={isOpen ? getTooltipsDirection() : 'bottom'}
          disableInteractive
        >
          <Box
            sx={{
              ...styles.flag(country.code === selectedLanguage),
              ...styles.openFlag(isOpen, i, direction),
            }}
            onClick={() => {
              handleFlagClick(country.code)
            }}
          >
            <img
              src={country.img}
              alt={`${country.code} Flag`}
              style={styles.img}
            />
          </Box>
        </Tooltip>
      ))}
    </Box>
  )
}

export default LanguagePicker
