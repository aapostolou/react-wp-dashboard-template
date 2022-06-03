import { alpha } from '@mui/material'

export const styles = {
  wrapper: {
    position: 'relative',
    width: 100,
    height: 100,

    borderRadius: 2,
  },
  container: {
    position: 'relative',
    width: 'inherit',
    height: 'inherit',

    border: 1,
    borderRadius: 'inherit',
    borderColor: 'divider',

    cursor: 'pointer',

    boxSizing: 'border-box',

    '&:hover': {
      boxShadow: (theme) => `0px 0px 0px 1px ${theme.palette.primary.main}`,
      borderColor: 'primary.main',
    },

    overflow: 'hidden',
  },
  label: {
    display: 'flex',

    position: 'relative',
    width: '100%',
    height: '100%',

    cursor: 'inherit',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',

    cursor: 'inherit',

    zIndex: -1,
  },
  watermark: {
    position: 'absolute',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '100%',

    borderRadius: 'inherit',
    cursor: 'inherit',

    '&:hover': {
      backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.2),
    },
  },
  input: { display: 'none' },
  spinner: {
    position: 'absolute',

    borderRadius: 'inherit',
  },
}
