<<template>
    <b-row>
        <b-col cols="3">
          <div v-if="pipelines.length > 0">
            <h2>Pipelines</h2>
            <ul>
                <li v-for="pipeline in pipelines">
                    <router-link :to='pipelineUrl(pipeline)'>{{ pipeline.Name }}</router-link>
                </li>
            </ul>
          </div>
          <div v-else>
            Loading pipelines from Sitecore Commerce
          </div>
        </b-col>
        <b-col>
            <pipeline v-bind:pipeline="selectedPipeline" />
        </b-col>
    </b-row>
</template>

<script>
import axios from "axios";
import Pipeline from "./pipeline.vue";
import sortJsonArray from "sort-json-array";

export default {
  name: "Pipelines",
  props: ["pipelineid"],
  data() {
    return {
      pipelines: [],
      selectedPipeline: null
    };
  },
  components: {
    Pipeline
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
            this.pipelines = sortJsonArray(response.data.List, "Namespace");
          });
      });
  },
  beforeUpdate() {
    if (this.pipelineid) {
      var pipeline = this.pipelines.find(pipeline => {
        return `${pipeline.Namespace}.${pipeline.Name}` == this.pipelineid;
      });
      this.selectedPipeline = pipeline;
    }
  },
  methods: {
    selectPlugin: function() {},
    pipelineUrl: function(pipeline) {
      return `/pipelines/${pipeline.Namespace}.${pipeline.Name}`;
    }
  }
};
</script>

<style>

</style>
