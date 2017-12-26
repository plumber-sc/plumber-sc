import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pipelines: [],
    blocks: [],
    count: 0
  },
  mutations: {
    setPipelines: (state, pipelines) => {
      state.pipelines = pipelines
    },
    setBlocks: (state, blocks) => {
      state.blocks = blocks
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
    }
  }
})
