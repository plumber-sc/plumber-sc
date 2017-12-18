<<template>
    <div class="pipeline">
        <div v-if="!pipeline">
            No pipeline selected.
        </div>
        <div v-else>
            <h3>{{ pipeline.Name }}</h3>
            <h4>{{ pipeline.Namespace }}</h4>
            <ul>
                <li v-for="block in pipeline.Blocks">
                    {{ block.Name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "Pipeline",
  props: ["pipeline"],
  data() {
    return {
      blocks: []
    };
  },
  created() {},
  beforeUpdate() {
    this.blocks = pipeline.blocks;
  }
};
</script>

<style>

</style>
