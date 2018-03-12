<<template>
    <div>
        <h3>{{ policySetName }}</h3>
        <div v-html="getMarkedupJson(policy)">
        </div>
    </div>
</template>

<script>
import PolicyTypeMixin from "../../mixins/PolicyTypeMixin";

export default {
  mixins: [PolicyTypeMixin],
  computed: {
    policySet: function() {
      var policySetId = this.policy.PolicySetId;
      var policySetName = policySetId.substring(
        policySetId.lastIndexOf("-") + 1
      );
      return this.$store.getters.getPolicySet(policySetName);
    },
    policySetName: function() {
      var policySetId = this.policy.PolicySetId;
      var policySetName = policySetId.substring(
        policySetId.lastIndexOf("-") + 1
      );
      return policySetName;
    }
  },
  mounted() {
    this.$store.dispatch("getPolicySet", {
      environmentName: this.environmentName,
      policySetName: this.policySetName
    });
  }
};
</script>

<style>

</style>
