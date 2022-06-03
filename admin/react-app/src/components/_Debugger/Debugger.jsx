import { useState } from 'react'

import { Box, Button } from '@mui/material'
import OpenButton from './OpenButton/OpenButton'
import CloseButton from './CloseButton/CloseButton'

import { styles } from './styles'
import LogoutButton from './LogoutButton'

const Debugger = () => {
  const [isOpen, setOpen] = useState()

  const handleOpenButton = () => {
    setOpen(true)
  }

  const handleCloseButton = () => {
    setOpen(false)
  }

  return (
    <Box sx={styles.wrapper}>
      {!isOpen ? (
        <OpenButton onOpen={handleOpenButton} />
      ) : (
        <Box sx={styles.container}>
          <Box sx={styles.header}>
            <CloseButton onClose={handleCloseButton} />
          </Box>
          <Box>
            <LogoutButton />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Debugger
