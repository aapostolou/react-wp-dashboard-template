import { combineEpics, ofType } from 'redux-observable'
import { map } from 'rxjs/operators'

import { changeLanguage } from './actions'

const handleChangeLanguageEpic = (action$, state$) =>
  action$.pipe(
    ofType(changeLanguage.type),
    map((action) => {
      const { payload } = action
      const { available } = state$.value.language

      return available.includes(payload)
        ? changeLanguage.succeeded(payload)
        : changeLanguage.failed('Language not available')
    })
  )

const epics = combineEpics(handleChangeLanguageEpic)

export default epics
