import * as types from './mutations.types'

export default {
  resetState ({ commit }) {
    //
  },

  startLoading ({ state, commit }, key) {
    commit(types.SET_LOADING, { key, value: true })
  },

  stopLoading ({ commit }, key) {
    commit(types.SET_LOADING, { key, value: false })
  },

  toggleLoading ({ state, commit }, key) {
    commit(types.SET_LOADING, { key, value: !state.entities[key] })
  }
}
