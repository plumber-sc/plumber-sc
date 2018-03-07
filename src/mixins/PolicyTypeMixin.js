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
      return this.policy["@odata.type"].substring(1);
    }
  },
  mounted() {},
  methods: {
    getMarkedupJson: function(json) {
      return jsonMarkup(json);
    }
  }
}
