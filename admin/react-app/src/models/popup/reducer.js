import { handleActions } from 'redux-actions'

import { openConfirmPopUp, closeConfirmPopUp } from './actions'

const initialState = {
  confirmPopUp: {
    title: null,
    content: null,
    callbackYes: null,
    callbackNo: null,
    yesText: 'YES',
    noText: 'NO',
    isOpen: false,
  },
}

const reducer = handleActions(
  {
    [openConfirmPopUp.type]: (state, action) => ({
      ...state,
      confirmPopUp: {
        title: action.payload?.title,
        content: action.payload?.content,
        callbackYes: action.payload?.callbackYes,
        callbackNo: action.payload?.callbackNo,
        yesText: action.payload?.yesText,
        noText: action.payload?.noText,
        isOpen: true,
      },
    }),
    [closeConfirmPopUp.type]: (state) => ({
      ...state,
      confirmPopUp: {
        ...initialState,
      },
    }),
  },
  initialState
)

export default reducer
