<<template>
  <div class="policies">
    <h1>Policies</h1>
    <b-form-select v-model="selected" :options="environments" class="mb-3">
    </b-form-select>
    <div v-if="selected">
        <h2>{{ environment.Id }} </h2>
        {{ environment.Name }} (version {{ environment.Version }})
        <policy v-for="policy in environment.Policies" :key="policy.PolicyId" :policy="policy"></policy>
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
      selected: null
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
    }
  },
  components: {
    Policy
  }
};
</script>

<style>

</style>
