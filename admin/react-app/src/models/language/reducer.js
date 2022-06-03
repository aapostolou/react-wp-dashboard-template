import { handleActions } from 'redux-actions'

import { changeLanguage } from './actions'

const initialState = {
  current: 'EN',
  available: ['EN', 'GR'],
}

const reducer = handleActions(
  {
    [changeLanguage.succeeded.type]: (state, action) => ({
      ...state,
      current: action.payload,
    }),
  },
  initialState
)

export default reducer
