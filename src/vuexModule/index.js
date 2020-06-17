import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

export default (moduleName, store) => {
  if (!store) {
    throw new Error('you must provide a Vuex store for this plugin to work')
  }

  const vuexModule = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
  }

  if (!store.hasModule(moduleName)) {
    store.registerModule(moduleName, vuexModule)
  }

  store.$isLoading = (key) => store.getters[`${moduleName}/isLoading`](key)

  store.$startLoading = (key) =>
    store.dispatch(`${moduleName}/startLoading`, key)

  store.$endLoading = (key) => store.dispatch(`${moduleName}/endLoading`, key)

  store.$toggleLoading = (key) =>
    store.dispatch(`${moduleName}/toggleLoading`, key)
}
