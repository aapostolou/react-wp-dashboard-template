import { Backdrop, CircularProgress } from '@mui/material'

import { styles } from './styles'

const Spinner = ({ isOpen = false, sx = {}, ...rest }) => (
  <Backdrop sx={{ ...styles, ...sx }} open={isOpen} {...rest}>
    <CircularProgress color="inherit" />
  </Backdrop>
)

export default Spinner
