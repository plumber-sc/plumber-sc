import Vue from 'vue'
import Vuex from 'vuex'
import { createFlashStore } from 'vuex-flash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    environments: [],
    pipelines: [],
    blocks: [],
    schema: null,
    plugins: [],
    config: null,
    finishedLoading: false,
    connectionError: false,
    loadMessages: []
  },
  mutations: {
    setEnvironments: (state, environments) => {
      state.environments = environments
    },
    setPipelines: (state, pipelines) => {
      state.pipelines = pipelines
    },
    setBlocks: (state, blocks) => {
      state.blocks = blocks
    },
    setSchema: (state, schema) => {
      state.schema = schema
    },
    setPlugins: (state, plugins) => {
      state.plugins = plugins
    },
    setConfig: (state, config) => {
      state.config = config
    },
    setFinishedLoading: (state, finishedLoading) => {
      state.finishedLoading = finishedLoading
    },
    setConnectionError: (state, connectionError) => {
      state.connectionError = connectionError
    },
    addLoadMessage: (state, loadMessage) => {
      state.loadMessages.push(loadMessage)
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
  },
  plugins: [
    createFlashStore()
  ]
})
