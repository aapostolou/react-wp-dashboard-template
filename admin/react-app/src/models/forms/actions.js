import { namespacedActionCreators } from '../lib'

const { actionCreator } = namespacedActionCreators('forms')

export const openTestForm = actionCreator('OPEN TEST FORM')
