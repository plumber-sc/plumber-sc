<<template>
  <div class="blocks">
       <h1>Blocks <small class="text-muted">({{ blocks.length}} blocks found)</small></h1>
    <b-row>
      <b-col>
         <form id="blocksearch">
            <div class="typeahead__container">
                <div class="typeahead__field">
                    <span class="typeahead__query">
                        <input class="js-typeahead" name="q" type="search" placeholder="Start typing to search for any text in the blocks" autocomplete="off">
                    </span>
                </div>
            </div>
        </form>
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
import typeahead from "jquery-typeahead";
import Router from '../router';

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
    this.selectedBlockName = this.blockname;
  },
  activated() {
    console.log("Activated");
    this.selectedBlockName = this.blockname;
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params) {
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
     $.typeahead({
        input: ".js-typeahead",
        order: 'asc',
        display: ['Name', 'Namespace'],
        source: { data: this.blocks },
        template: "{{Name}} <small>in</small> <small style='color:#999;'>{{Namespace}}</small>",
        templateValue: "{{Namespace}}.{{Name}}",
        maxItem: 100,
        callback: {
            onClick: function (node, a, item, event) {
                var suggestion = `${item.Namespace}.${item.Name}`;
                Router.push(`/blocks/${suggestion}`);
            },
            onCancel: function(node, event) {
              Router.push('/blocks');
            }
        }
      });
    }
  }
};

</script>

<style>
#blocksdropdown {
  width: 100%;
}
#blocksearch .typeahead__list {
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
