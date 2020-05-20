import * as types from './mutations.types'

export default {
  startLoading ({ state, commit }, key) {
    commit(types.SET_LOADING, { key, value: true })
  },

  endLoading ({ commit }, key) {
    commit(types.SET_LOADING, { key, value: false })
  },

  toggleLoading ({ state, commit }, key) {
    commit(types.SET_LOADING, { key, value: !state.entities[key] })
  }
}
