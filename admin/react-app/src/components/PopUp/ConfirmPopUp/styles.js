export const styles = {
  title: {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',

    '&+.MuiDialogContent-root': {
      padding: 0,
    },
  },
  content: {
    padding: 3,
    paddingBottom: 1.5,
  },
  actions: {
    padding: 2,

    '& .MuiButton-root': {
      minWidth: 100,
    },
  },
}
