<<template>
    <div class="metadata">
    <h1>Metadata</h1>
    <b-row>
      <b-col>
        <div class="form-group has-feedback has-clear">
          <input id="typeSearch" type="text" class="typeahead form-control" v-model="searchText" v-on:keyup="searchChange" data-provide="typeahead" placeholder="Name of the type">
          <a class="glyphicon glyphicon-remove-sign form-control-feedback form-control-clear" ng-click="ctrl.clearSearch()" style="pointer-events: auto; text-decoration: none;cursor: pointer;"></a>
        </div>
      </b-col>
    </b-row>
    <b-row v-for="schemaItem in filteredSchema" class="mt-3">
      <b-col>
        <div class="namespace">
             <h2>{{ schemaItem.namespace }}</h2>
            <structure :structure="schemaItem.types"></structure>
        </div>
      </b-col>
    </b-row>

    </div>
</template>

<script>
import Structure from "@/components/Structure";
import _ from "underscore";

export default {
  data: function() {
    return {
      searchText: ""
    };
  },
  computed: {
    schema: function() {
      return this.$store.state.schema;
    },
    filteredSchema: function() {
      var filteredSchema = [];
      if (this.$store.state.schema) {
        this.$store.state.schema.forEach(element => {
          var include = false;

          if (
            !this.searchText ||
            this.searchText == "" ||
            this.searchText.length < 4
          ) {
            include = true;
          } else {
            if (
              element.$.Namespace
                .toLowerCase()
                .indexOf(this.searchText.toLowerCase()) >= 0
            ) {
              include = true;
            }
          }

          var schemaElement = {
            namespace: element.$.Namespace,
            types: this.getStructure(element, this.searchText)
          };

          Object.keys(schemaElement.types).forEach((key, index) => {
            if (schemaElement.types[key].length > 0) {
              include = true;
            }
          });

          if (include) {
            filteredSchema.unshift(schemaElement);
          }
        });
      }

      return filteredSchema;
    }
  },
  components: {
    Structure
  },
  mounted() {},
  methods: {
    searchChange: function() {
      console.log(this.searchText);
    },
    getStructure: function(schema, searchText) {
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
            element.type = "Other";
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

      if (searchText && searchText.length > 3) {
        commands = this.filter(commands, this.searchText);
        entities = this.filter(entities, this.searchText);
        components = this.filter(components, this.searchText);
        policies = this.filter(policies, this.searchText);
        functions = this.filter(functions, this.searchText);
        actions = this.filter(actions, this.searchText);
        models = this.filter(models, this.searchText);
        entitycontainers = this.filter(entitycontainers, this.searchText);
        enumtypes = this.filter(enumtypes, this.searchText);
        others = this.filter(others, this.searchText);
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
    },
    filter: function(items, searchtext) {
      return _.filter(items, item => {
        return item.$.Name.toLowerCase().indexOf(searchtext.toLowerCase()) >= 0;
      });
    }
  }
};
</script>

<style>
.namespace h2 {
  color: #424242;
  border-bottom: solid 1px #bdbdbd;
}
</style>
