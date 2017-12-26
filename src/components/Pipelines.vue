<<template>
  <div>
    <h1>Pipelines ({{ pipelines.length}})</h1>
    <b-row>
      <b-col>
        <div class="form-group has-feedback has-clear">
          <input type="text" class="typeahead form-control" data-provide="typeahead" placeholder="Name of the pipeline">
          <a class="glyphicon glyphicon-remove-sign form-control-feedback form-control-clear" ng-click="ctrl.clearSearch()" style="pointer-events: auto; text-decoration: none;cursor: pointer;"></a>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <pipeline v-bind:pipeline="selectedPipeline" />
        </b-col>
    </b-row>
    </div>
</template>

<script>
import axios from "axios";
import Pipeline from "./pipeline.vue";
import sortJsonArray from "sort-json-array";
import $ from "jquery";
import Typeahead from "typeahead.js";

export default {
  name: "Pipelines",
  props: ["pipelineid"],
  data() {
    return {
      pipelines: [],
      pipelineNames: [],
      namespaces: [],
      blocks: [],
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
            this.pipelines = sortJsonArray(response.data.List, "Namespace");
            this.pipelines.forEach(pipeline => {
              if (!this.namespaces.includes(pipeline.Namespace)) {
                this.namespaces.unshift(pipeline.Namespace);
              }
              this.pipelineNames.unshift(
                `${pipeline.Namespace}.${pipeline.Name}`
              );
              pipeline.Blocks.forEach(block => {
                var blockName = `${block.Namespace}.${block.Name}`;
                if (!this.blocks.includes(blockName)) {
                  this.blocks.unshift(blockName);
                }
              });
              //this.$store.commit("setPipelines", this.pipelines);
              //this.$store.commit("setBlocks", this.blocks);
            });

            $(".typeahead").typeahead(
              {
                hint: true,
                highlight: true,
                minLength: 1
              },
              {
                name: "pipelines",
                limit: 10,
                source: substringMatcher(this.pipelineNames)
              }
            );
          });
      });
  },
  mounted() {
    var self = this;
    $(".typeahead").bind("typeahead:select", function(ev, suggestion) {
      self.selectPlugin(suggestion);
    });
  },
  beforeUpdate() {
    if (this.pipelineid) {
      var pipeline = this.pipelines.find(pipeline => {
        return `${pipeline.Namespace}.${pipeline.Name}` == this.pipelineid;
      });
      console.log("BeforeUpdate:" + pipeline.Name);
      this.selectedPipeline = pipeline;
      console.log(this.selectedPipeline.Name);
    }
  },
  methods: {
    selectPlugin: function(suggestion) {
      console.log("Selection: " + suggestion);
      var pipeline = this.pipelines.find(pipeline => {
        return `${pipeline.Namespace}.${pipeline.Name}` == suggestion;
      });
      console.log("BeforeUpdate:" + pipeline.Name);
      //this.selectedPipeline = pipeline;
      this.$router.push(`/pipelines/${suggestion}`);
    },
    pipelineUrl: function(pipeline) {
      return `/pipelines/${pipeline.Namespace}.${pipeline.Name}`;
    }
  }
};

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substringRegex = new RegExp(q, "i");

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substringRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};
</script>

<style>

</style>
