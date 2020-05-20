export default (moduleName) => {
  return {
    methods: {
      $isLoading (key) {
        return this.$store.getters[`${moduleName}/isLoading`](key)
      },

      $startLoading (key) {
        return this.$store.dispatch(`${moduleName}/startLoading`, key)
      },

      $endLoading (key) {
        return this.$store.dispatch(`${moduleName}/endLoading`, key)
      },

      $toggleLoading (key) {
        return this.$store.dispatch(`${moduleName}/toggleLoading`, key)
      }
    }
  }
}
