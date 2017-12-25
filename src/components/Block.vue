<<template>
    <div class="block">
        <h2>{{ blockName }}</h2>
        <p>Used in the following pipelines:</p>
        <ul>
            <li v-for="pipeline in pipelines">
                <router-link :to="{ name: 'pipelines', params: { pipelineid: getPipelineName(pipeline) }}">
                {{ pipeline.Name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ["blockName"],
  data() {
    return {
      pipelines: []
    };
  },
  beforeUpdate() {
    this.pipelines = this.$store.getters.getPipelinesForBlock(this.blockName);
  },
  methods: {
      getPipelineName: (pipeline) => {
          return `${pipeline.Namespace}.${pipeline.Name}`
      }
  }
};
</script>

<style>

</style>
