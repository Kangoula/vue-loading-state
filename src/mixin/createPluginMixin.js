function getComponentName() {
  if (this._isVue) {
    return this.$options.name
  }

  return null
}

function getKey(key) {
  return key ?? getComponentName.call(this)
}

export default moduleName => {
  return {
    methods: {
      $isLoading(key) {
        return this.$store.getters[`${moduleName}/isLoading`](
          getKey.call(this, key)
        )
      },

      async $startLoading(key) {
        await this.$store.dispatch(
          `${moduleName}/startLoading`,
          getKey.call(this, key)
        )
      },

      async $endLoading(key) {
        await this.$store.dispatch(
          `${moduleName}/endLoading`,
          getKey.call(this, key)
        )
      },

      async $toggleLoading(key) {
        await this.$store.dispatch(
          `${moduleName}/toggleLoading`,
          getKey.call(this, key)
        )
      },
    },
  }
}
