<<template>
    <div>
    <h1>Schema</h1>
    <b-row v-for="schemaItem in schema" class="mt-3">
      <b-col>
        <div>
             <h2>{{ schemaItem.$.Namespace }}</h2>
            <structure :structure="getStructure(schemaItem)"></structure>
        </div>
      </b-col>
    </b-row>

    </div>
</template>

<script>
import Structure from "@/components/Structure";

export default {
  computed: {
    schema: function() {
      return this.$store.state.schema;
    }
  },
  components: {
    Structure
  },
  mounted() {},
  methods: {
    getStructure: function(schema) {
      var commands = [];
      var entities = [];
      var policies = [];
      var components = [];
      var others = [];

      if (schema.EntityType) {
        schema.EntityType.forEach(element => {
          if (element.$.Name.endsWith("Command")) {
            commands.unshift(element);
          } else if (element.$.Name.endsWith("Component")) {
            components.unshift(element);
          } else if (element.$.Name.endsWith("Entity")) {
            entities.unshift(element);
          } else if (element.$.Name.endsWith("Policy")) {
            policies.unshift(element);
          } else if (element.$.Name.endsWith("Policy")) {
            policies.unshift(element);
          } else {
            others.unshift(element);
          }
        });
      }

      if (schema.ComplexType) {
        schema.ComplexType.forEach(element => {
          if (element.$.Name.endsWith("Command")) {
            commands.unshift(element);
          } else if (element.$.Name.endsWith("Policy")) {
            policies.unshift(element);
          } else if (element.$.Name.endsWith("Policy")) {
            policies.unshift(element);
          } else {
            others.unshift(element);
          }
        });
      }

      return {
        commands: commands,
        entities: entities,
        components: components,
        policies: policies,
        others: others
      };
    }
  }
};
</script>

<style>

</style>
