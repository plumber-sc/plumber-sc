import axios from "axios";
import * as api from "../api";

export const initData = context => {
  var headers = {
    Authorization: context.state.token,
    "Content-Type": "application/json"
  };

  context.commit("setStartedLoading", true);
  context.commit("addLoadMessage", "Loading configuration");
  // Get configuration
  axios
    .get("/static/config.json")
    .then(response => {
      var config = response.data;
      context.commit("setConfig", config);
      context.commit("addLoadMessage", "Loaded configuration");

      api.getMetaData(context.state.config, headers, context);

      api.getEnvironments(context.state.config, headers, context);
      api.getPlugins(context.state.config, headers, context);
      api.getPipelines(context.state.config, headers, context);
    })
    .catch(function(error) {
      context.commit("setConnectionError", true);
    });
};

export const getPolicySet = (context, policySetName) => {
  var headers = {
    Authorization: context.state.token,
    "Content-Type": "application/json"
  };
  axios
    .get(context.state.config.EngineUri + `/api/PolicySets('${policySetName}')`, {
      headers: headers
    })
    .then(response => {
      context.commit("setPolicySet", response.data)
    });
};
