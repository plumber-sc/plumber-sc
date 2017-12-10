<<template>
    <b-row>
        <b-col cols="3">
        <h1>Pipelines</h1>
        <ol>
            <li v-for="plugin in plugins">
            {{ plugin.Name }}
            </li>
        </ol>
        </b-col>
    </b-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Pipelines",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      plugins: []
    };
  },
  created() {
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    axios
      .post(
        "http://localhost:5050/connect/token",
        "password=b&grant_type=password&username=sitecore%5Cadmin&client_id=csconfig&scope=openid+EngineAPI+postman_api",
        headers
      )
      .then(response => {
        var token = `Bearer ${response.data.access_token}`;
        var headers = {
          Authorization: token,
          "Content-Type": "application/json"
        };
        axios
          .get("http://localhost:5000/commerceops/GetPipelines()", {
            headers: headers
          })
          .then(response => {
            console.log(response);
            this.plugins = response.data.List;
          });
      });
  }
};
</script>

<style>

</style>
