<<template>
    <div>
        Sitecore.Commerce.Core.PolicySetPolicy
        {{ policy.PolicyId }}
        {{ policy.PolicySetId }}
    </div>
</template>

<script>
import PolicyTypeMixin from "../../mixins/PolicyTypeMixin";

export default {
  mixins: [PolicyTypeMixin]
};
</script>

<style>

</style>
