import { merge } from 'lodash'

import { handleActions } from 'redux-actions'

import { openTestForm } from './actions'

const initialState = {
  testForm: {
    isOpen: false,
  },
}

const reducer = handleActions(
  {
    [openTestForm.type]: (state) => ({
      ...merge(state, {
        testForm: {
          isOpen: true,
        },
      }),
    }),
  },
  initialState
)

export default reducer
