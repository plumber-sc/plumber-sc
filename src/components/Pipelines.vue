<template>
   <div class="pipelines">
      <b-row class="mt-3" v-if="selectedPipeline">
         <b-col>
            <router-link :to="{ name: 'pipelines'}">
               <i class="fas fa-chevron-circle-left"></i> Back to all pipelines
            </router-link>
            <pipeline v-bind:pipeline="selectedPipeline" v-bind:count="0" />
         </b-col>
      </b-row>
      <b-row v-if="!selectedPipeline">
         <b-col>
            <h1>
               Pipelines
               <small class="text-muted">({{ pipelines.length}} pipelines found)</small>
            </h1>
            <b-form-input v-model="pipelinefilter" placeholder="Start typing to filter pipelines"></b-form-input>
            <div class="pipelinelist">
               <div v-for="letter in allLetters()" v-bind:key="letter">
                  <div class="letter">{{letter}}</div>
                  <div v-for="pipeline in selectedPipelines(letter)" v-bind:key="pipeline.Name">
                     <router-link
                        :to="{ name: 'pipelines', params: { pipelineid: getPipelineName(pipeline) }}"
                     >{{ pipeline.Name }}</router-link>
                  </div>
               </div>
            </div>
         </b-col>
      </b-row>
   </div>
</template>

<script>
import Pipeline from "./Partials/Pipeline";
import Router from "../router";

export default {
   name: "Pipelines",
   props: ["pipelineid"],
   data() {
      return {
         selectedPipelineName: "",
         namespaces: [],
         pipelinefilter: ""
      };
   },
   computed: {
      pipelines: function() {
         return this.$store.state.pipelines;
      },
      pipelineNames: function() {
         var namespaces = [];
         var pipelineNames = [];

         this.pipelines.forEach(pipeline => {
            if (!this.namespaces.includes(pipeline.Namespace)) {
               namespaces.unshift(pipeline.Namespace);
            }
            pipelineNames.unshift({
               name: pipeline.Name,
               namespace: pipeline.Namespace
            });
         });
         return pipelineNames;
      },
      selectedPipeline: function() {
         var pipeline = this.pipelines.find(pipeline => {
            return `${pipeline.Namespace}.${pipeline.Name}` == this.pipelineid;
         });
         return pipeline;
      }
   },
   components: {
      Pipeline
   },
   methods: {
      getPipelineName: pipeline => {
         return `${pipeline.Namespace}.${pipeline.Name}`;
      },
      selectPlugin: function(suggestion) {
         var pipeline = this.pipelines.find(pipeline => {
            return `${pipeline.Namespace}.${pipeline.Name}` == suggestion;
         });
         this.$router.push(`/pipelines/${pipeline}`);
      },
      pipelineUrl: function(pipeline) {
         return `/pipelines/${pipeline.Namespace}.${pipeline.Name}`;
      },
      hit: function(event) {
         var suggestion = `${event.namespace}.${event.name}`;
         Router.push(`/pipelines/${suggestion}`);
      },
      selectedPipelines: function(letter) {
         return this.$store.state.pipelines.filter(item => {
            if (item.Name.substr(1, 1) !== letter) return false;
            if (this.pipelinefilter.length < 2) return true;
            else
               return (
                  item.Name.toLowerCase().indexOf(
                     this.pipelinefilter.toLowerCase()
                  ) >= 0
               );
         });
      },
      allLetters: function() {
         return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      }
   }
};
</script>

<style>
#pipelinesearch .typeahead__list {
   max-height: 300px;
   overflow-y: auto;
   overflow-x: hidden;
}

.pipelinelist {
   padding-top: 12px;
   column-count: 3;
}

.pipelinelist .letter {
   margin-top: 12px;
   font-weight: bold;
   font-size: 1.5em;
   border-bottom: solid 1px #e0e0e0;
}
</style>
