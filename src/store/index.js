import Vue from "vue";
import Vuex from "vuex";
import { createFlashStore } from "vuex-flash";
import * as actions from "./actions";
import axios from "axios";
import _ from 'underscore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    environments: [],
    pipelines: [],
    blocks: [],
    policySets: [],
    schema: null,
    plugins: [],
    config: null,
    token: null,
    startedLoading: false,
    finishedLoading: false,
    connectionError: false,
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
    addLoadMessage: (state, loadMessage) => {
      state.loadMessages.push(loadMessage);
    },
    setPolicySet: (state, payload) => {
      var environmentIndex = state.environments.findIndex(i => i.Name === payload.environmentName)
      var policyIndex = state.environments[environmentIndex].Policies.findIndex(i => i.PolicySetId === payload.policySet.Id)
      state.environments[environmentIndex].Policies[policyIndex] = payload.policySet;

      var environment = _.find(state.environments, environment => {
        return environment.Name === payload.environmentName;
      })
      var policy = _.find(environment.Policies, policy => {
        return policy.PolicySetId === payload.policySet.Id
      })
      policy = payload.policySet;
      state.policySets.unshift(payload.policySet);
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
