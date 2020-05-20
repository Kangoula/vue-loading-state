import Vue from 'vue'
import { getDefaultState } from './state'
import * as types from './mutations.types'

export default {
  [types.SET_LOADING] (state, { key, value }) {
    Vue.set(state.entities, key, value)
  },

  [types.REMOVE_LOADING] (state, key) {
    Vue.delete(state.entities, key)
  }
}
