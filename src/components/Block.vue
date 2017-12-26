<<template>
<div>
    <div v-if="!block">
        Something...
        </div>
    <div class="block" v-else>
        <span class="namespace">{{ block.Namespace }}</span>
        <h3>{{ block.Name }}</h3>

        <div>
            <i class="fa fa-cog" aria-hidden="true"></i>
        </div>
        <div>
            <i class="fa fa-sign-in" aria-hidden="true"></i> {{ block.Receives }}
        </div>
        <div>
            <i class="fa fa-sign-out" aria-hidden="true"></i> {{ block.Returns }}
        </div>
        <p>Used in the following pipelines:</p>
        <ul>
            <li v-for="pipeline in pipelines">
                <router-link :to="{ name: 'pipelines', params: { pipelineid: getPipelineName(pipeline) }}">
                {{ pipeline.Name }}
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
  props: ["blockname"],
  data() {
    return {
      pipelines: []
    };
  },
  computed: {
    block: function() {
      var selectedBlock = null;
      if (this.blockname) {
        selectedBlock = this.$store.state.blocks.find(block => {
          return this.blockname === `${block.Namespace}.${block.Name}`;
        });
        this.pipelines = this.$store.getters.getPipelinesForBlock(
          this.blockname
        );
      }
      return selectedBlock;
    }
  },
  mounted() {
    if (this.blockname) {
      this.block = this.$store.state.blocks.find(block => {
        return this.blockname === `${block.Namespace}.${block.Name}`;
      });
      this.pipelines = this.$store.getters.getPipelinesForBlock(this.blockname);
    }
  },
  beforeUpdate() {
    if (this.blockname) {
      this.block = this.$store.state.blocks.find(block => {
        return this.blockname === `${block.Namespace}.${block.Name}`;
      });
      this.pipelines = this.$store.getters.getPipelinesForBlock(this.blockname);
    }
  },
  methods: {
    getPipelineName: pipeline => {
      return `${pipeline.Namespace}.${pipeline.Name}`;
    }
  }
};
</script>

<style>

</style>
