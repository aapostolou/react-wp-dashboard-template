import { useTranslation } from '../..'

import { Box, Button, Dialog, Stack } from '@mui/material'

const PopUpForm = ({
  title,
  isOpen,
  onClose,
  children,
  submitLabel = 'SUBMIT',
  ...rest
}) => {
  const { translate } = useTranslation()

  const handleClose = () => {
    onClose?.()
  }

  return (
    <Dialog open={isOpen ? true : false} onClose={handleClose} {...rest}>
      <Stack sx={styles.box} spacing={2}>
        {title && (
          <Box>
            {title}
            <hr />
          </Box>
        )}
        {children}
        <Button variant="contained">{translate(submitLabel)}</Button>
      </Stack>
    </Dialog>
  )
}

export default PopUpForm
