<template>
  <div id="app" class="container">
    <b-row class="mb-3">
      <b-col cols="12">
        <navigation></navigation>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <router-view/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Navigation from "./components/navigation";

import axios from "axios";
import sortJsonArray from "sort-json-array";

export default {
  name: "app",
  components: {
    Navigation
  },
  created() {
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    axios
      .post(
        "http://localhost:5050/connect/token",
        "password=b&grant_type=password&username=sitecore%5Cadmin&client_id=csconfig&scope=openid+EngineAPI+postman_api",
        headers
      )
      .then(response => {
        var token = `Bearer ${response.data.access_token}`;
        var headers = {
          Authorization: token,
          "Content-Type": "application/json"
        };
        axios
          .get("http://localhost:5000/commerceops/GetPipelines()", {
            headers: headers
          })
          .then(response => {
            var pipelines = sortJsonArray(response.data.List, "Namespace");
            var namespaces = [];
            var pipelineNames = [];
            var blocks = [];

            pipelines.forEach(pipeline => {
              if (!namespaces.includes(pipeline.Namespace)) {
                namespaces.unshift(pipeline.Namespace);
              }
              pipelineNames.unshift(`${pipeline.Namespace}.${pipeline.Name}`);

              pipeline.Blocks.forEach(block => {
                var blockName = `${block.Namespace}.${block.Name}`;
                if (!blocks.includes(blockName)) {
                  blocks.unshift(blockName);
                }
              });
            });

            this.$store.commit("setPipelines", pipelines);
            this.$store.commit("setBlocks", blocks);

          });
      });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
