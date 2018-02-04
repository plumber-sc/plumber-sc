<<template>
  <div class="plugins">
    <h1>Plugins</h1>
    <div class="message">The following plugins were loaded:</div>
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
.message {
  font-weight: bold;
  font-size: 120%;
}
</style>
