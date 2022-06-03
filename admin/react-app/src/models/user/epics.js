import { combineEpics, ofType } from 'redux-observable'
import { switchMap } from 'rxjs/operators'
import { debounceTime } from 'rxjs'

import { toast } from 'react-toastify'
import { translateWithLanguage } from '../../components/TranslationsProvider'

import { logIn, validateToken } from './actions'

const hostname = process.env.REACT_APP_HOSTNAME

const handleLogInEpic = (action$, state$) =>
  action$.pipe(
    ofType(logIn.type),
    debounceTime(100),
    switchMap((action) => {
      const { username, password } = action.payload

      const { translate } = translateWithLanguage(state$.value.language.current)

      if (!(username && password)) {
        return new Promise((resolve) => {
          resolve(logIn.failed(translate('NO_USERNAME_OR_PASSWORD')))
        })
      }

      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      return fetch(hostname + '/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.token) {
            localStorage.setItem('token', json.token)
            return logIn.succeeded({ token: json.token })
          } else {
            toast.error(translate('LOGIN_FAILED'))
            return logIn.failed(json)
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error(translate('LOGIN_ERROR'))
          return logIn.failed(err)
        })
    })
  )

const handleValidateTokenEpic = (action$, state$) =>
  action$.pipe(
    ofType(validateToken.type),
    debounceTime(100),
    switchMap(() => {
      const { token } = state$.value.user

      const { translate } = translateWithLanguage(state$.value.language.current)

      if (!token) {
        return new Promise((resolve) => {
          resolve(validateToken.failed(translate('TOKEN_MISSING')))
        })
      }

      return fetch(hostname + '/wp-json/jwt-auth/v1/token/validate', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json?.code === 'jwt_auth_valid_token') {
            return validateToken.succeeded()
          } else {
            toast.error(translate('TOKEN_VALIDATION_FAILED'))
            localStorage.removeItem('token')
            return validateToken.failed(json)
          }
        })
        .catch((err) => {
          toast.error(translate('TOKEN_VALIDATION_SERVER_ERROR'))
          return validateToken.failed(err)
        })
    })
  )

const epics = combineEpics(handleLogInEpic, handleValidateTokenEpic)

export default epics
