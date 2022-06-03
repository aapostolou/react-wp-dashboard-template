import { handleActions } from 'redux-actions'

import { enableSpinner, disableSpinner } from './actions'

const initialState = {
  spinner: false,
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
  },
  initialState
)

export default reducer
