import { useTranslation } from '../..'

import { Box, Button, Dialog, IconButton, Stack } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import { styles } from './styles'

const PopUpForm = ({
  title,
  isOpen,
  onClose,
  hideCloseButton,
  children,
  submitLabel = 'SUBMIT',
  onSubmit,
  isSubmitDisabled,
  disableOutsideClick,
  ...rest
}) => {
  const { translate } = useTranslation()

  const handleClose = (e, reason) => {
    if (disableOutsideClick) {
      if (reason && reason == 'backdropClick') return
    }

    onClose?.()
  }

  return (
    <Dialog open={isOpen ? true : false} onClose={handleClose} {...rest}>
      <Stack direction="row" alignItems="center" spacing={2} sx={styles.header}>
        <Box sx={styles.title}>{title}</Box>
        {!hideCloseButton && (
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon color="error" />
            </IconButton>
          </Box>
        )}
      </Stack>
      <Stack sx={styles.box} spacing={2}>
        {children}
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={isSubmitDisabled}
        >
          {translate(submitLabel)}
        </Button>
      </Stack>
    </Dialog>
  )
}

export default PopUpForm
