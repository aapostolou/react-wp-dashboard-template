import { namespacedActionCreators } from '../lib'

const { actionCreator, effectActionCreator } =
  namespacedActionCreators('general')

export const enableSpinner = effectActionCreator('ENABLE SPINNER')
export const disableSpinner = effectActionCreator('DISABLE SPINNER')

export const changeToLightMode = actionCreator('CHANGE TO LIGHT MODE')
export const changeToDarkMode = actionCreator('CHANGE TO DARK MODE')
