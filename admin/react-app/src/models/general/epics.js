import { combineEpics, ofType } from 'redux-observable'
import { map } from 'rxjs/operators'

import { enableSpinner, disableSpinner } from './actions'
import { logIn, validateToken } from '../user'

const spinnerEffects = [logIn, validateToken]

const getEffectTypes = () => {
  return spinnerEffects.map((effect) => effect.type)
}

const getEffectResultTypes = () => {
  return spinnerEffects.reduce(
    (final, effect) => [...final, effect.succeeded.type, effect.failed.type],
    []
  )
}

const handleEnableSpinnerEpic = (action$) =>
  action$.pipe(
    ofType(...getEffectTypes()),
    map(() => enableSpinner())
  )

const handleDisableSpinnerEpic = (action$) =>
  action$.pipe(
    ofType(...getEffectResultTypes()),
    map(() => disableSpinner())
  )

const epics = combineEpics(handleEnableSpinnerEpic, handleDisableSpinnerEpic)

export default epics
