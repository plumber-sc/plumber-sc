<template>
<div>
    <div v-if="!block">
        <b-row>
        </b-row>
    </div>
    <div v-else class="block">
        <span class="namespace">{{ block.Namespace }}</span>
        
        <h3 v-if="context == 'pipeline'">
          <router-link :to="{ name: 'blocks', params: { blockname: `${block.Namespace}.${block.Name}` }}">{{ block.Name }}</router-link>
        </h3>
        <h3 v-if="context == 'block'">{{ block.Name }}</h3>

        <div v-bind:title="'Input: '+block.Receives" class="code">
            <i class="fas fa-sign-in-alt"></i> {{ block.Receives | prettyClrType }}
        </div>
        <div v-bind:title="'Output: '+block.Returns" class="code">
            <i class="fas fa-sign-out-alt"></i> {{ block.Returns | prettyClrType }}
        </div>
        <div v-if="context == 'block'" class="spacing-above">
            <h5>Used in the following pipelines:</h5>
            <ul>
                <li v-for="pipeline in pipelines" v-bind:key="pipeline.Name">
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
  props: ["blockname", 
  "context"],
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
      }
      return selectedBlock;
    },
    pipelines: function() {
      return this.$store.getters.getPipelinesForBlock(this.blockname);
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
  padding: 20px;
  padding-left: 20px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
}

.timeline-label.pipeline .block {
  background-color: #fff59d !important;
}

.spacing-above {
  padding-top: 12px;
}
</style>
