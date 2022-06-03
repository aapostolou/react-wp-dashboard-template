import { useEffect, useRef, useState } from 'react'

import { IconButton, Stack, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'

const EditButton = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <EditIcon color="primary" />
  </IconButton>
)

const SaveCloseButtons = ({ onSave, onCancel }) => {
  return (
    <Stack spacing={0} direction="row">
      <IconButton onClick={onSave}>
        <SaveIcon color="primary" />
      </IconButton>
      <IconButton onClick={onCancel}>
        <CloseIcon color="error" />
      </IconButton>
    </Stack>
  )
}

const EditableTextField = ({ value, onSave }) => {
  const [isActive, setActive] = useState()
  const ref = useRef()

  const handleEditButton = () => {
    setActive(true)
  }

  const handleSaveButton = () => {
    if (value === ref.current.value) {
      setActive(false)
    } else {
      onSave?.(ref.current.value)
    }
  }

  const handleCancelButton = () => {
    setActive(false)
  }

  useEffect(() => {
    if (isActive) setActive(false)
  }, [value])

  return (
    <TextField
      key={isActive}
      defaultValue={value}
      disabled={!isActive}
      focused={isActive}
      inputRef={ref}
      InputProps={{
        endAdornment: (
          <>
            {isActive ? (
              <SaveCloseButtons
                onSave={handleSaveButton}
                onCancel={handleCancelButton}
              />
            ) : (
              <EditButton onClick={handleEditButton} />
            )}
          </>
        ),
      }}
    />
  )
}

export default EditableTextField
