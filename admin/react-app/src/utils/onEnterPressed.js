import { useEffect } from 'react'

/**
 * Create an event listener that executes a callback when the
 * 'Enter' button is pressed.
 *
 * @param {Function} callback
 * @param {*[]} dependencies
 */
export const onEnterPressed = (callback, dependencies = []) => {
  if (!callback || !(callback instanceof Function)) {
    throw `'callback' must be a Function.`
  }

  const handleKeyUp = (e) => {
    if (e.which === 13) {
      callback()
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, dependencies)
}
