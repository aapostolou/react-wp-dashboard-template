const width = 35
const height = 20

export const styles = {
  container: {
    position: 'relative',
    width,
    height,
  },
  flag: (isSelected) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: 1,
    borderColor: 'text.secondary',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    zIndex: isSelected ? 1 : 0,
    fontSize: 0,
  }),
  openFlag: (isOpen, index, direction = 'down') => {
    if (isOpen) {
      if (direction === 'right') {
        return { marginLeft: (width + 10) * index + 'px' }
      } else if (direction === 'left') {
        return { marginRight: (width + 10) * index + 'px' }
      } else if (direction === 'up') {
        return { marginBottom: (height + 5) * index + 'px' }
      } else if (direction === 'down') {
        return { marginTop: (height + 5) * index + 'px' }
      } else {
        return {}
      }
    } else {
      return {}
    }
  },
  img: {
    width: '100%',
    height: '100%',

    objectFit: 'fill',
    objectPosition: 'center',
  },
}
