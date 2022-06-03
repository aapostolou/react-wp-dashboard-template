import { Provider } from 'react-redux'

import { combineReducers } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

import { configStore } from './lib'

import { reducer as languageReducer, epics as languageEpics } from './language'
import { reducer as userReducer, epics as userEpics } from './user'
import { reducer as generalReducer, epics as generalEpics } from './general'
import { reducer as formsReducer, epics as formsEpics } from './forms'

// Adding all the necessary reducers here
const rootReducer = combineReducers({
  language: languageReducer,
  user: userReducer,
  general: generalReducer,
  forms: formsReducer,
})

// Adding all the necessary epics here
const rootEpics = combineEpics(languageEpics, userEpics, generalEpics)

const epicMiddleware = createEpicMiddleware()

// Initial store state here
const initialState = {}
const middlewares = [epicMiddleware]
const store = configStore(rootReducer, initialState, middlewares)

// Start the middleware
epicMiddleware.run(rootEpics)

const CustomProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

export default CustomProvider
