import snakeCase from 'lodash/snakeCase'

const actionCreator = (namespace, type) => {
  const namespaceType = `${namespace}/${snakeCase(type).toUpperCase()}`

  const actionCreatorFunc = (payload) => ({
    type: namespaceType,
    payload,
  })

  actionCreatorFunc.type = namespaceType

  return actionCreatorFunc
}

const effectActionCreator = (namespace, type) => {
  const action = actionCreator(namespace, type)

  action.succeeded = actionCreator(namespace, `${type}_SUCCEEDED`)
  action.failed = actionCreator(namespace, `${type}_FAILED`)

  return action
}

const namespacedActionCreators = (namespace) => ({
  actionCreator: (type) => actionCreator(namespace, type),
  effectActionCreator: (type) => effectActionCreator(namespace, type),
})

export { actionCreator, effectActionCreator, namespacedActionCreators }
