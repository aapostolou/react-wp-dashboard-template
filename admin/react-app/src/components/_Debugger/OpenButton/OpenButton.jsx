import { Box } from '@mui/material'

import { styles } from './styles'

let interval

const OpenButton = ({ onOpen }) => {
  const handleOpenButtonMouseDown = () => {
    interval = setTimeout(() => {
      onOpen(true)
    }, 1000)
  }
  const handleOpenButtonMouseUp = () => {
    clearTimeout(interval)
  }

  return (
    <Box
      sx={styles}
      onMouseDown={handleOpenButtonMouseDown}
      onTouchStart={handleOpenButtonMouseDown}
      onMouseUp={handleOpenButtonMouseUp}
      onTouchEnd={handleOpenButtonMouseUp}
    />
  )
}

export default OpenButton
