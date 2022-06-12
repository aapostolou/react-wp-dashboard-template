import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { styles } from './styles'

const ConfirmPopUp = ({
  title,
  content,
  callbackYes,
  callbackNo,
  yesText = 'YES',
  noText = 'NO',
  isOpen = false,
  closeConfirmPopUp,
}) => {
  const handleYesClick = () => {
    callbackYes?.()
    closeConfirmPopUp()
  }

  const handleNoClick = () => {
    callbackNo?.()
    closeConfirmPopUp()
  }

  return (
    <Dialog open={isOpen}>
      <DialogTitle sx={styles.title}>{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText sx={styles.content}>{content}</DialogContentText>
        </DialogContent>
      )}
      <Stack
        direction={'row'}
        alignItems="center"
        justifyContent="center"
        spacing={4}
        sx={styles.actions}
      >
        <Button variant="contained" color="success" onClick={handleYesClick}>
          {yesText}
        </Button>
        <Button variant="contained" color="error" onClick={handleNoClick}>
          {noText}
        </Button>
      </Stack>
    </Dialog>
  )
}

export default ConfirmPopUp
