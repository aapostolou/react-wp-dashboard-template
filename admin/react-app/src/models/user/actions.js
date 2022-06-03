import { namespacedActionCreators } from '../lib'

const { effectActionCreator } = namespacedActionCreators('user')

export const logIn = effectActionCreator('LOGIN')
export const validateToken = effectActionCreator('VALIDATE TOKEN')
