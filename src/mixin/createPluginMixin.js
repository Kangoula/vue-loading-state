export default (moduleName) => {
  return {
    methods: {
      $isLoading (key) {
        return this.$store.getters[`${moduleName}/isLoading`](key)
      },

      async $startLoading (key) {
        await this.$store.dispatch(`${moduleName}/startLoading`, key)
      },

      async $endLoading (key) {
        await this.$store.dispatch(`${moduleName}/endLoading`, key)
      },

      async $toggleLoading (key) {
        await this.$store.dispatch(`${moduleName}/toggleLoading`, key)
      }
    }
  }
}
