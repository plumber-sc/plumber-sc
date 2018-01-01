<<template>
    <div>
        <type title="Commands" :types="structure.commands"></type>
        <type title="Entites" :types="structure.entities"></type>
        <type title="Components" :types="structure.components"></type>
        <type title="Policies" :types="structure.policies"></type>
        <type title="Others" :types="structure.others"></type>
    </div>
</template>

<script>
import Properties from "@/components/Properties";
import Type from "@/components/Type";

export default {
  props: ["structure"],
  components: {
    Properties,
    Type
  }
};
</script>

<style>

</style>
