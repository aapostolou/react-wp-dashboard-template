import { alpha } from '@mui/material'

export const styles = {
  wrapper: {
    position: 'fixed',
    zIndex: 1000,
  },
  container: {
    position: 'fixed',
    width: '100%',
    height: '100%',

    top: 0,

    padding: 1,

    backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.7),
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}
