import { namespacedActionCreators } from '../lib'

const { effectActionCreator } = namespacedActionCreators('general')

export const enableSpinner = effectActionCreator('ENABLE SPINNER')
export const disableSpinner = effectActionCreator('DISABLE SPINNER')
