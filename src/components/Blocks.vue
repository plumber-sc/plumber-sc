<<template>
  <div class="blocks">
       <h1>Blocks ({{ blocks.length }})</h1>
    <b-row>
      <b-col>
        <div class="form-group has-feedback has-clear">
          <div id="scrollable-dropdown-menu">
            <input id="blocksdropdown" type="text" class="typeahead form-control" data-provide="typeahead" placeholder="Enter (part of) the name of the block">
          </div>
          <a class="glyphicon glyphicon-remove-sign form-control-feedback form-control-clear" ng-click="ctrl.clearSearch()" style="pointer-events: auto; text-decoration: none;cursor: pointer;"></a>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
          <Block  v-bind:blockname="selectedBlockName"></Block>
        </b-col>
    </b-row>
    </div>
</template>

<script>
import $ from "jquery";
import Typeahead from "typeahead.js";

import Block from "./Block";

export default {
  name: "Blocks",
  props: ["blockname"],
  data() {
    return {
      selectedBlockName: null
    };
  },
  computed: {
    blocks() {
      return this.$store.state.blocks;
    }
  },
  created() {},
  components: { Block },
  mounted() {
    var self = this;
    this.initTypeAhead();
    $("#blocksdropdown").bind("typeahead:select", function(ev, suggestion) {
      self.selectBlock(suggestion);
    });
    this.selectedBlockName = this.blockname;
  },
  activated() {
    console.log("Activated");
    this.selectedBlockName = this.blockname;
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    if (to.params.blockname) {
      this.selectedBlockName = to.params.blockname;
    }
    next();
  },
  beforeUpdate() {
    this.initTypeAhead();
  },
  methods: {
    selectBlock: function(suggestion) {
      console.log("Selection: " + suggestion);
      this.$router.push({ name: "blocks", params: { blockname: suggestion } });
    },
    initTypeAhead: function() {
      $("#blocksdropdown").typeahead("destroy");
      $("#blocksdropdown").typeahead(
        {
          hint: true,
          highlight: true,
          minLength: 1
        },
        {
          name: "blocks",
          limit: 20,
          source: substringMatcher(this.blocks)
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
      var blockname = `${str.Namespace}.${str.Name}`;
      if (substringRegex.test(blockname)) {
        matches.push(blockname);
      }
    });

    cb(matches);
  };
};
</script>

<style>
#blocksdropdown {
  width: 100%;
}
#scrollable-dropdown-menu .tt-menu {
  max-height: 150px;
  overflow-y: auto;
}
</style>
