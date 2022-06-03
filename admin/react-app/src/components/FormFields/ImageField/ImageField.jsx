import { useState } from 'react'

import { Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import Spinner from '../../Spinner'

import { styles } from './styles'

const ImageField = ({ src, multiple, onChange, sx }) => {
  const [source, setSrc] = useState(src)
  const [spinner, setSpinner] = useState(src ? true : false)

  const disableSpinner = () => {
    setSpinner(false)
  }

  const handleInputChange = (e) => {
    const files = e.target.files

    if (multiple) {
      onChange?.(files)
    } else {
      onChange?.(files[0])

      if (FileReader) {
        setSpinner(true)

        const fr = new FileReader()
        fr.onload = function () {
          setSrc(fr.result)
        }
        fr.onerror = function () {
          setSpinner(false)
        }
        fr.readAsDataURL(files[0])
      }
    }
  }

  return (
    <Box sx={{ ...styles.wrapper, ...sx }}>
      <Box sx={styles.container}>
        <label style={styles.label}>
          {source && (
            <img
              src={source}
              alt="Image Input Field"
              style={styles.image}
              onLoad={disableSpinner}
            />
          )}
          <Box sx={styles.watermark}>
            <AddIcon sx={{ fontSize: 40 }} color="disabled" />
          </Box>
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            style={styles.input}
            onChange={handleInputChange}
          />
        </label>
      </Box>
      <Spinner isOpen={spinner} sx={styles.spinner} />
    </Box>
  )
}

export default ImageField
