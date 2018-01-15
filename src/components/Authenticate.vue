<<template>

</template>

<script>
import _ from "underscore";

export default {
  mounted() {
    var hashParts = this.$route.hash.split("&");
    var hash = {};
    _.each(hashParts, element => {
      var parts = element.split("=", 2);
      hash[parts[0]] = parts[1];
    });

    if (hash.access_token) {
      var token = `Bearer ${hash.access_token}`;
      this.$store.commit("setToken", token);

      this.$store.dispatch("initData");
      this.$router.push({
        name: "pipelines"
      });
    }
  }
};
</script>

<<style>

</style>
