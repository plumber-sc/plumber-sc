<<template>
    <div>
    <h1>Schema</h1>
    <b-row>
      <b-col>
        <div class="form-group has-feedback has-clear">
          <input id="typeSearch" type="text" class="typeahead form-control" data-provide="typeahead" placeholder="Name of the type">
          <a class="glyphicon glyphicon-remove-sign form-control-feedback form-control-clear" ng-click="ctrl.clearSearch()" style="pointer-events: auto; text-decoration: none;cursor: pointer;"></a>
        </div>
      </b-col>
    </b-row>
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
      var functions = [];
      var models = [];
      var entitycontainers = [];
      var enumtypes = [];
      var actions = [];

      if (schema.EntityType) {
        schema.EntityType.forEach(element => {
          if (
            element.$.Name.endsWith("Command") ||
            element.$.BaseType ==
              "Sitecore.Commerce.Core.Commands.CommerceCommand"
          ) {
            element.type = "Command";
            commands.unshift(element);
          } else if (element.$.Name.endsWith("Component")) {
            element.type = "Component";
            components.unshift(element);
          } else if (
            element.$.Name.endsWith("Entity") ||
            element.$.BaseType == "Sitecore.Commerce.Core.CommerceEntity"
          ) {
            element.type = "Entity";
            entities.unshift(element);
          } else if (element.$.Name.endsWith("Policy")) {
            element.type = "Policy";
            policies.unshift(element);
          } else {
            element.type = "Other";
            others.unshift(element);
          }
        });
      }

      if (schema.ComplexType) {
        schema.ComplexType.forEach(element => {
          if (element.$.Name.endsWith("Command")) {
            element.type = "Commmand";
            commands.unshift(element);
          } else if (
            element.$.Name.endsWith("Policy") ||
            element.$.BaseType == "Sitecore.Commerce.Core.Policy"
          ) {
            element.type = "Policy";
            policies.unshift(element);
          } else if (
            element.$.Name.endsWith("Model") ||
            element.$.BaseType == "Sitecore.Commerce.Core.Model"
          ) {
            element.type = "Model";
            models.unshift(element);
          } else {
            others.unshift(element);
          }
        });
      }

      if (schema.Function) {
        schema.Function.forEach(element => {
          element.type = "Function";
          functions.unshift(element);
        });
      }

      if (schema.Action) {
        schema.Action.forEach(element => {
          element.type = "Action";
          actions.unshift(element);
        });
      }

      if (schema.EntityContainer) {
        schema.EntityContainer.forEach(element => {
          element.type = "EntityContainer";
          entitycontainers.unshift(element);
        });
      }

      if (schema.EnumType) {
        schema.EnumType.forEach(element => {
          element.type = "EnumType";
          enumtypes.unshift(element);
        });
      }

      return {
        commands: commands,
        entities: entities,
        components: components,
        policies: policies,
        functions: functions,
        actions: actions,
        models: models,
        entitycontainers: entitycontainers,
        enumtypes: enumtypes,
        others: others
      };
    }
  }
};
</script>

<style>

</style>
