<<template>
<div class="block">

    <div v-if="!block">
          <b-row>
              </b-row>
              </div>
    <div v-else>
        <b-row>
            <b-col>
        <span class="namespace">{{ block.Namespace }}</span>
        <h3>{{ block.Name }}</h3>

        <div>
            <i class="fa fa-sign-in" aria-hidden="true"></i> {{ block.Receives }}
        </div>
        <div>
            <i class="fa fa-sign-out" aria-hidden="true"></i> {{ block.Returns }}
        </div>
        </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
        <h4>Used in the following pipelines:</h4>
        <ul>
            <li v-for="pipeline in pipelines">
                <router-link :to="{ name: 'pipelines', params: { pipelineid: getPipelineName(pipeline) }}">
                {{ pipeline.Name }}
                </router-link>
            </li>
        </ul>
            </b-col>
        </b-row>
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
  mounted() {},
  beforeUpdate() {},
  methods: {
    getPipelineName: pipeline => {
      return `${pipeline.Namespace}.${pipeline.Name}`;
    }
  }
};
</script>

<style>

</style>
