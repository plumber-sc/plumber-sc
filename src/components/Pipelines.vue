<<template>
  <div class="pipelines">
    <h1>Pipelines ({{ pipelines.length}})</h1>
    <b-row>
      <b-col>
        <div class="form-group has-feedback has-clear">
          <div id="scrollable-dropdown-menu">
            <input id="pipelineSearch" type="text" class="typeahead form-control" data-provide="typeahead" placeholder="Name of the pipeline">
          </div>
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
        pipelineNames.unshift(`${pipeline.Namespace}.${pipeline.Name}`);
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
    $("#pipelineSearch").bind("typeahead:select", function(ev, suggestion) {
      self.selectPlugin(suggestion);
    });
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
      $("#pipelineSearch").typeahead("destroy");
      $("#pipelineSearch").typeahead(
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
#scrollable-dropdown-menu .tt-dropdown-menu {
  max-height: 150px;
  overflow-y: auto;
}
</style>
