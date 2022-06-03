import { namespacedActionCreators } from '../lib'

const { effectActionCreator } = namespacedActionCreators('language')

export const changeLanguage = effectActionCreator('CHANGE LANGUAGE')
