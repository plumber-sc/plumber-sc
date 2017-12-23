<<template>
  <div>
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
      this.selectedPipeline = pipeline;
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
input.typeahead {
  width: 100%;
}

span.twitter-typeahead .tt-menu,
span.twitter-typeahead .tt-dropdown-menu {
  cursor: pointer;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}
span.twitter-typeahead .tt-suggestion {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333333;
  white-space: nowrap;
}
span.twitter-typeahead .tt-suggestion.tt-cursor,
span.twitter-typeahead .tt-suggestion:hover,
span.twitter-typeahead .tt-suggestion:focus {
  color: #ffffff;
  text-decoration: none;
  outline: 0;
  background-color: #337ab7;
}
.input-group.input-group-lg span.twitter-typeahead .form-control {
  height: 46px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
.input-group.input-group-sm span.twitter-typeahead .form-control {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
span.twitter-typeahead {
  width: 100%;
}
.input-group span.twitter-typeahead {
  display: block !important;
  height: 34px;
}
.input-group span.twitter-typeahead .tt-menu,
.input-group span.twitter-typeahead .tt-dropdown-menu {
  top: 32px !important;
}
.input-group
  span.twitter-typeahead:not(:first-child):not(:last-child)
  .form-control {
  border-radius: 0;
}
.input-group span.twitter-typeahead:first-child .form-control {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group span.twitter-typeahead:last-child .form-control {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.input-group.input-group-sm span.twitter-typeahead {
  height: 30px;
}
.input-group.input-group-sm span.twitter-typeahead .tt-menu,
.input-group.input-group-sm span.twitter-typeahead .tt-dropdown-menu {
  top: 30px !important;
}
.input-group.input-group-lg span.twitter-typeahead {
  height: 46px;
}
.input-group.input-group-lg span.twitter-typeahead .tt-menu,
.input-group.input-group-lg span.twitter-typeahead .tt-dropdown-menu {
  top: 46px !important;
}
</style>
