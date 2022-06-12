import { namespacedActionCreators } from '../lib'

const { effectActionCreator } = namespacedActionCreators('popup')

export const openConfirmPopUp = effectActionCreator('OPEN CONFIRM POP UP')
export const closeConfirmPopUp = effectActionCreator('CLOSE CONFIRM POP UP')
