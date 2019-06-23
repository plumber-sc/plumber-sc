import Vue from "vue";
import Vuex from "vuex";
import { createFlashStore } from "vuex-flash";
import * as actions from "./actions";
import axios from "axios";
import _ from "underscore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    environments: [],
    pipelines: [],
    blocks: [],
    schema: null,
    policySets: [],
    plugins: [],
    config: null,
    token: null,
    startedLoading: false,
    finishedLoading: false,
    connectionError: null,
    authenticating: false,
    loadMessages: []
  },
  mutations: {
    setEnvironments: (state, environments) => {
      state.environments = environments;
    },
    setPipelines: (state, pipelines) => {
      state.pipelines = pipelines;
    },
    setBlocks: (state, blocks) => {
      state.blocks = blocks;
    },
    setSchema: (state, schema) => {
      state.schema = schema;
    },
    setPlugins: (state, plugins) => {
      state.plugins = plugins;
    },
    setConfig: (state, config) => {
      state.config = config;
    },
    setToken: (state, token) => {
      state.token = token;
    },
    setStartedLoading: (state, startedLoading) => {
      state.startedLoading = startedLoading;
    },
    setFinishedLoading: (state, finishedLoading) => {
      state.finishedLoading = finishedLoading;
    },
    setConnectionError: (state, connectionError) => {
      state.connectionError = connectionError;
    },
    setAuthenticating: (state, authenticating)  => {
      state.authenticating = authenticating;
    },
    addLoadMessage: (state, loadMessage) => {
      state.loadMessages.push(loadMessage);
    },
    setPolicySet: (state, payload) => {
      if (state.policySets.indexOf(payload.policySet.Id) < 0) {
        _.forEach(state.environments, (environment, index) => {
          var policyIndex = state.environments[index].Policies.findIndex(
            i => i.PolicySetId === payload.policySet.Id
          );
          state.environments[index].Policies[policyIndex] = payload.policySet;
        });
        state.policySets.unshift(payload.policySet.Id);
      }
    }
  },
  getters: {
    getPipelinesForBlock: state => blockname => {
      var pipelinesForBlock = [];

      state.pipelines.forEach(pipeline => {
        pipeline.Blocks.forEach(block => {
          if (blockname === `${block.Namespace}.${block.Name}`) {
            pipelinesForBlock.unshift(pipeline);
          }
        });
      });
      return pipelinesForBlock;
    },
    getPipeline: state => pipelineName => {
      var pipeline = state.pipelines.find(element => {
        return `${element.Namespace}.${element.Name}` === pipelineName;
      });
      return pipeline;
    },
    getConfig: state => () => {},
    getPolicySet: state => name => {
      var policySet = state.policySets.find(policySet => {
        return policySet.Id.endsWith(name);
      });
      return policySet;
    }
  },
  actions,
  plugins: [createFlashStore()]
});
