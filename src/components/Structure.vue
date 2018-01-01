<<template>
    <div>
        <type title="Commands" :types="structure.commands"></type>
        <type title="Entities" :types="structure.entities"></type>
        <type title="Components" :types="structure.components"></type>
        <type title="Policies" :types="structure.policies"></type>
        <type title="Functions" :types="structure.functions"></type>
        <type title="Actions" :types="structure.actions"></type>
        <type title="Models" :types="structure.models"></type>
        <type title="Entity Containers" :types="structure.entitycontainers"></type>
        <type title="Enum Types" :types="structure.enumtypes"></type>
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
