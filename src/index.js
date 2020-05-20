import createVuexModule from './vuexModule'
import createPluginMixin from './mixin/createPluginMixin'

const createLoadingPlugin = ({ moduleName }) => {
  return (Vue, { store }) => {
    createVuexModule(moduleName, store)
    Vue.mixin(createPluginMixin(moduleName))
  }
}

export default createLoadingPlugin
