import jsonMarkup from "json-markup";

export default {
  props: ['policy', 'environmentName'],
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
    },
    dataType: function() {
      return this.policy["@odata.type"] ? this.policy["@odata.type"].substring(1) : this.policy.Name
    }
  },
  mounted() {},
  methods: {
    getMarkedupJson: function(json) {
      return jsonMarkup(json);
    }
  }
}
