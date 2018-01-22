<template>
  <div class="policies">
    <b-row>
      <b-col>
        <h1>Policies</h1>
      </b-col>

      <b-col>
        <form>
          <div class="form-group row">
            <label for="environmentSelect" class="col-sm-3 col-form-label">Environment: </label>
            <div class="col-sm-9">
              <b-form-select id="environmentSelect" v-model="selected" :options="environments" class="mb-3" />
            </div>
          </div>
        </form>
      </b-col>
    </b-row>

    <div v-if="selected">
      <h2>{{ environment.Id }} </h2>
      {{ environment.Name }} (version {{ environment.Version }})
      <form class="searchform">
        <div class="form-group row">
          <label for="searchText" class="col-sm-3 col-form-label">Search for policy containing:</label>
          <div class="col-sm-9">
            <b-form-input v-model="searchText" type="text" placeholder="Search text"></b-form-input>
          </div>
        </div>
      </form>
      <div class="results">
        {{ policies.length }} policies found.
      </div>
      <policy v-for="policy in policies" :key="policy.PolicyId" :policy="policy"></policy>
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
.searchform {
  background-color: #fafafa;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
  padding-bottom: 6px;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  column-break-inside: avoid;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
}

.results {
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
  padding-bottom: 6px;
}
</style>
