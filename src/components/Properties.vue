<<template>
  <div v-if="properties && properties.length > 0">

    <property name="item" v-for="item in properties" :property="item"></property>
  </div>
</template>

<script>
import Property from "@/components/Property";

export default {
  props: ["properties"],
  components: {
    Property
  }
};
</script>

<style>

</style>
