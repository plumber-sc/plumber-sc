<<template>
  <div class="policies">
    <h1>Policies</h1>
     <div class="form-group">
    <label for="environmentSelect">Environment</label>
    <b-form-select id="environmentSelect" v-model="selected" :options="environments" class="mb-3">

    </b-form-select>
    </div>
    <div v-if="selected">
        <h2>{{ environment.Id }} </h2>
            <div class="form-group">
      <label for="environmentSelect">Search for policy containing:</label>
      <b-form-input v-model="searchText"
                  type="text"
                  placeholder="Enter your name"></b-form-input>
      </div>
        {{ environment.Name }} (version {{ environment.Version }})
        <policy v-for="policy in policies" :key="policy.PolicyId" :policy="policy"></policy>
    </div

        </div>
  </div>
</template>

<script>
import _ from "underscore";
import Policy from "@/components/Policy.vue";

export default {
  data() {
    return {
      selected: null,
      searchText: ""
    };
  },
  computed: {
    environments: function() {
      var environmentNames = _.pluck(this.$store.state.environments, "Name");
      return environmentNames;
    },
    environment: function() {
      var environment = _.find(this.$store.state.environments, environment => {
        return environment.Name == this.selected;
      });
      return environment;
    },
    policies: function() {
      var policies = this.environment.Policies;
      if (this.searchText != "") {
        policies = _.filter(policies, policy => {
          return (
            JSON.stringify(policy)
              .toLowerCase()
              .indexOf(this.searchText.toLowerCase()) >= 0
          );
        });
      }
      return policies;
    }
  },
  components: {
    Policy
  }
};
</script>

<style>

</style>
