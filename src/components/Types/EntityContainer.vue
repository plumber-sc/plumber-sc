<<template>
<div>
    <div v-if="item.Property && item.Property.length > 0">
    <property name="item" v-for="item in item.Property" :key="item.Name" :property="item"></property>
  </div>
</div>
</template>

<script>
import Property from "@/components/Property";

export default {
  props: ["item"],
  components: { Property }
};
</script>

<style>

</style>
