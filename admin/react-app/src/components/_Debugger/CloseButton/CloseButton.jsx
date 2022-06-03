import { IconButton } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

const CloseButton = ({ onClose }) => (
  <IconButton onClick={onClose}>
    <CloseIcon color="error" fontSize="large" />
  </IconButton>
)

export default CloseButton
