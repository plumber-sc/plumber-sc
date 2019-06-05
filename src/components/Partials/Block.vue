<template>
<div>
    <div v-if="!block">
        <b-row>
        </b-row>
    </div>
    <div v-else class="block">
        <span class="namespace">{{ block.Namespace }}</span>
        <h3>
            <router-link :to="{ name: 'blocks', params: { blockname: `${block.Namespace}.${block.Name}` }}">{{ block.Name }}</router-link>
        </h3>

        <div v-bind:title="'Input: '+block.Receives" class="code">
            <i class="fas fa-sign-in-alt"></i> {{ block.Receives | prettyClrType }}
        </div>
        <div v-bind:title="'Output: '+block.Returns" class="code">
            <i class="fas fa-sign-out-alt"></i> {{ block.Returns | prettyClrType }}
        </div>
        <div>
            <h4>Used in the following pipelines:</h4>
            <ul>
                <li v-for="pipeline in pipelines">
                    <router-link :to="{ name: 'pipelines', params: { pipelineid: getPipelineName(pipeline) }}">
                    {{ pipeline.Name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { prettyClrType } from "../../filters/clrTypes";

export default {
  props: ["blockname"],
  data() {
    return {
      pipelines: []
    };
  },
  filters: {
    prettyClrType
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
    },
    getPipeline: function (namespace, name) {
      var pipeline = this.pipelines.find(pipeline => {
        return `${pipeline.Namespace}.${pipeline.Name}` == `${namespace}.${name}`;
      });
      return pipeline;
    }
  }
};
</script>

<style>
.block {
  background-color: #aed581 !important;
  padding: 10px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
}
.timeline-label.pipeline .block {
  background-color: #fff59d !important;
}
</style>
