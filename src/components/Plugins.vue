<<template>
  <div class="plugins">
  <h1>Plugins</h1>
  <div v-for="plugin in plugins">
    {{ plugin.Name }}
    </div>
    </div>
</template>

<script>
import sortJsonArray from "sort-json-array";

export default {
  computed: {
    plugins: function() {
      return sortJsonArray(this.$store.state.plugins, "Name");
    }
  }
};
</script>

<style>

</style>
