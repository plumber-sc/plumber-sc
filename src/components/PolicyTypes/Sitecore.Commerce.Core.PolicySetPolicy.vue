<<template>
    <div>
        Policy set: {{ policy.PolicySetId }}
    </div>
</template>

<script>
import PolicyTypeMixin from "../../mixins/PolicyTypeMixin";

export default {
  mixins: [PolicyTypeMixin]
};
</script>

<style>
.policy {
  background-color: #fff8e1;
}
</style>
