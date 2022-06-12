import { handleActions } from 'redux-actions'

import {
  enableSpinner,
  disableSpinner,
  changeToLightMode,
  changeToDarkMode,
} from './actions'

const initialState = {
  spinner: false,
  theme: localStorage.getItem('themeMode') || 'light',
}

const reducer = handleActions(
  {
    [enableSpinner.type]: (state) => ({
      ...state,
      spinner: true,
    }),
    [disableSpinner.type]: (state) => ({
      ...state,
      spinner: false,
    }),
    [changeToLightMode.type]: (state) => {
      localStorage.setItem('themeMode', 'light')

      return {
        ...state,
        theme: 'light',
      }
    },
    [changeToDarkMode.type]: (state) => {
      localStorage.setItem('themeMode', 'dark')

      return {
        ...state,
        theme: 'dark',
      }
    },
  },
  initialState
)

export default reducer
