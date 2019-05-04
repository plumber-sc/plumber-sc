<<template>
  <div class="pipelines">
    <h1>Pipelines <small class="text-muted">({{ pipelines.length}} pipelines found)</small></h1>
    <b-row>
      <b-col>
        <form id="pipelinesearch">
            <div class="typeahead__container">
                <div class="typeahead__field">
                    <span class="typeahead__query">
                        <input class="js-typeahead" name="q" type="search" placeholder="Start typing to search for any text in the pipelines" autocomplete="off">
                    </span>
                </div>
            </div>
        </form>
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
import Pipeline from "./Pipeline";
import sortJsonArray from "sort-json-array";
import $ from "jquery";
import typeahead from "jquery-typeahead";
import Router from "../router";

export default {
  name: "Pipelines",
  props: ["pipelineid"],
  data() {
    return {
      namespaces: []
    };
  },
  computed: {
    pipelines: function() {
      return this.$store.state.pipelines;
    },
    pipelineNames: function() {
      var namespaces = [];
      var pipelineNames = [];

      this.pipelines.forEach(pipeline => {
        if (!this.namespaces.includes(pipeline.Namespace)) {
          namespaces.unshift(pipeline.Namespace);
        }
        pipelineNames.unshift({
          name: pipeline.Name,
          namespace: pipeline.Namespace
        });
      });
      return pipelineNames;
    },
    selectedPipeline: function() {
      var pipeline = this.pipelines.find(pipeline => {
        return `${pipeline.Namespace}.${pipeline.Name}` == this.pipelineid;
      });
      return pipeline;
    }
  },
  components: {
    Pipeline
  },
  created() {},
  mounted() {
    var self = this;
    this.initTypeahead();
  },
  beforeUpdate() {
    if (this.pipelineid) {
      var pipeline = this.pipelines.find(pipeline => {
        return `${pipeline.Namespace}.${pipeline.Name}` == this.pipelineid;
      });
      this.selectedPipeline = pipeline;
    }
    this.initTypeahead();
  },
  methods: {
    selectPlugin: function(suggestion) {
      var pipeline = this.pipelines.find(pipeline => {
        return `${pipeline.Namespace}.${pipeline.Name}` == suggestion;
      });
      this.$router.push(`/pipelines/${suggestion}`);
    },
    pipelineUrl: function(pipeline) {
      return `/pipelines/${pipeline.Namespace}.${pipeline.Name}`;
    },
    initTypeahead: function() {
      $.typeahead({
        input: ".js-typeahead",
        order: "asc",
        display: ["name", "namespace"],
        source: { data: this.pipelineNames },
        template:
          "{{name}} <small>in</small> <small style='color:#999;'>{{namespace}}</small>",
        templateValue: "{{namespace}}.{{name}}",
        maxItem: 100,
        callback: {
          onClick: function(node, a, item, event) {
            var suggestion = `${item.namespace}.${item.name}`;
            Router.push(`/pipelines/${suggestion}`);
          },
          onCancel: function(node, event) {
            Router.push("/pipelines");
          }
        }
      });
    }
  }
};
</script>

<style>
#pipelinesearch .typeahead__list {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
