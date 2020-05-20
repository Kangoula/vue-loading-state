import Vue from 'vue'
import { getDefaultState } from './state'
import * as types from './mutations.types'
import { RESET_STATE } from '@/store/mutations.types.js'

export default {
  [RESET_STATE] (state) {
    Object.assign(state, getDefaultState())
  },

  [types.SET_LOADING] (state, { key, value }) {
    Vue.set(state.entities, key, value)
  },

  [types.REMOVE_LOADING] (state, key) {
    Vue.delete(state.entities, key)
  }
}
