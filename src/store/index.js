import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pipelines: [],
    blocks: [],
    schema: null
  },
  mutations: {
    setPipelines: (state, pipelines) => {
      state.pipelines = pipelines
    },
    setBlocks: (state, blocks) => {
      state.blocks = blocks
    },
    setSchema: (state, schema) => {
      state.schema = schema
    }
  },
  getters: {
    getPipelinesForBlock: (state) => (blockname) => {
      var pipelinesForBlock = []

      state.pipelines.forEach(pipeline => {
        pipeline.Blocks.forEach(block => {
          if (blockname === `${block.Namespace}.${block.Name}`) {
            pipelinesForBlock.unshift(pipeline)
          }
        })
      })
      return pipelinesForBlock
    },
    getPipeline: (state) => (pipelineName) => {
      var pipeline = state.pipelines.find((element) => {
        return `${element.Namespace}.${element.Name}` === pipelineName
      })
      return pipeline
    }
  }
})
