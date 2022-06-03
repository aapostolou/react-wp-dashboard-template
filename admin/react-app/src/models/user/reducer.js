import { handleActions } from 'redux-actions'

import { logIn, validateToken } from './actions'

const initialState = {
  token: localStorage ? localStorage.getItem('token') ?? null : null,
  isLoggedIn: false,
  initialValidation: false,
}

const reducer = handleActions(
  {
    [logIn.succeeded.type]: (state, action) => ({
      ...state,
      token: action.payload.token,
      isLoggedIn: true,
    }),
    [validateToken.succeeded.type]: (state) => ({
      ...state,
      isLoggedIn: true,
      initialValidation: true,
    }),
    [validateToken.failed.type]: (state) => ({
      ...state,
      isLoggedIn: false,
      initialValidation: true,
    }),
  },
  initialState
)

export default reducer
