export default {
  props: ['policy'],
  computed: {
    properties: function() {
      var properties = []
      for (var key in this.policy) {
        properties.push({
          key: key,
          value: this.policy[key]
        })
      }
      return properties
    }
  },
  mounted() {}
}
