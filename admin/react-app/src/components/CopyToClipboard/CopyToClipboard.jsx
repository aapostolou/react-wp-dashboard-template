import { toast } from 'react-toastify'

import { useTranslation } from '../TranslationsProvider'

import { IconButton, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const CopyToClipboard = ({ text }) => {
  const { translate } = useTranslation()

  const handleClick = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(translate('CUSTOMER_TOKEN_COPIED_SUCCESS'))
      })
      .catch(() => {
        toast.error(translate('CUSTOMER_TOKEN_COPIED_ERROR'))
      })
  }

  return (
    <Tooltip title={translate('COPY_TO_CLIPBOARD')} disableInteractive>
      <IconButton onClick={handleClick}>
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  )
}

export default CopyToClipboard
