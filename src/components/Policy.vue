<<template>
    <div class="policy">
        <component :is="componentType" :policy="policy" :environmentName="environmentName"></component>
    </div>
</template>

<script>
import Other from "@/components/PolicyTypes/Other.vue";
import SitecoreCommerceCorePolicySetPolicy from "@/components/PolicyTypes/Sitecore.Commerce.Core.PolicySetPolicy.vue";

export default {
  props: ["policy", "environmentName"],
  computed: {
    componentType: function() {
      var policyTypes = {
        "#Sitecore.Commerce.Core.PolicySetPolicy":
          "SitecoreCommerceCorePolicySetPolicy"
      };
      var componentType = ""// policyTypes[this.policy["@odata.type"]];
      return componentType ? componentType : "Other";
    }
  },
  components: {
    Other,
    SitecoreCommerceCorePolicySetPolicy
  }
};
</script>

<style>
.policies .policy {
  margin-bottom: 8px;
  padding: 10px;
  background-color: #fafafa;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  column-break-inside: avoid;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
}
</style>
