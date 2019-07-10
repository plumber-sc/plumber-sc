<template>
   <div class="pipeline">
      <div v-if="!pipeline"></div>
      <div v-else>
         <span class="namespace">{{ pipeline.Namespace }}</span>
         <h2>{{ pipeline.Name }}</h2>

         <div>
            <i class="far fa-comment" v-b-tooltip.hover title="Comments"></i>
            {{ pipeline.Comments }}
         </div>
         <div v-if="pipeline.Description" v-bind:title="pipeline.Description">
            <i class="fas fa-book-open"></i>
            {{ pipeline.Description }}
         </div>
         <div v-if="pipeline.AdditionalComments" v-bind:title="pipeline.AdditionalComments">
            <i class="fas fa-comment"></i>
            {{ pipeline.AdditionalComments }}
         </div>

         <div class="timeline-centered">
            <article class="timeline-entry start">
               <div class="timeline-entry-inner">
                  <div class="timeline-icon">
                     <i class="far fa-circle"></i>
                  </div>

                  <div class="timeline-label">
                     <h3>Start</h3>
                     <div v-bind:title="'Input: '+prettyClrType(pipeline.Receives)   " class="code">
                        <i class="fas fa-sign-in-alt"></i>
                        {{ pipeline.Receives | prettyClrType }}
                     </div>
                  </div>
                  <div class="timeline-code">
                     <i class="fas fa-chevron-right"></i>
                     <i
                        class="fas fa-scroll"
                        v-b-tooltip.hover
                        :title="'Generate code for adding a pipeline block before '+pipeline.Blocks[0].Name"
                        v-b-modal.modal-blockcode
                        @click="sendInfo(pipeline.Blocks[0], true)"
                     ></i>
                  </div>
               </div>
            </article>
            <article
               class="timeline-entry"
               v-for="block in pipeline.Blocks"
               v-bind:key="block.Name"
            >
               <div class="timeline-entry-inner">
                  <div class="timeline-icon">
                     <i class="fas fa-circle"></i>
                  </div>

                  <div class="timeline-label" v-bind:class="{ pipeline : isBlockPipeline(block) }">
                     <span class="namespace">{{ block.Namespace }}</span>
                     <h3 v-if="!isBlockPipeline(block)">
                        <router-link
                           :to="{ name: 'blocks', params: { blockname: `${block.Namespace}.${block.Name}` }}"
                        >{{ block.Name }}</router-link>
                     </h3>
                     <h3 v-else>
                        <router-link
                           :to="{ name: 'pipelines', params: { pipelineid: `${block.Namespace}.${block.Name}` }}"
                        >{{ block.Name }}</router-link>
                     </h3>

                     <div v-bind:title="'Input: '+block.Receives" class="code">
                        <i class="fas fa-sign-in-alt"></i>
                        {{ block.Receives | prettyClrType }}
                     </div>
                     <div v-bind:title="'Output: '+block.Returns" class="code">
                        <i class="fas fa-sign-out-alt"></i>
                        {{ block.Returns | prettyClrType }}
                     </div>
                  </div>

                  <div class="timeline-code">
                     <i class="fas fa-chevron-right"></i>
                     <i
                        class="fas fa-scroll"
                        v-b-tooltip.hover
                        :title="'Generate code for adding a pipeline block after '+block.Name"
                        v-b-modal.modal-blockcode
                        @click="sendInfo(block)"
                     ></i>
                  </div>
               </div>
            </article>

            <article class="timeline-entry finish">
               <div class="timeline-entry-inner">
                  <div class="timeline-icon">
                     <i class="far fa-circle"></i>
                  </div>

                  <div class="timeline-label">
                     <h3>Finish</h3>
                     <div v-bind:title="pipeline.Returns" class="code">
                        <i class="fas fa-sign-out-alt"></i>
                        {{ pipeline.Returns | prettyClrType }}
                     </div>
                  </div>
               </div>
            </article>
         </div>
      </div>
      <b-modal id="modal-blockcode" size="xl" title="Pipeline block code" v-model="show">
         <div>
            <b-form>
               <b-row>
                  <b-col>
                     <b-form-group id="input-group-1" label="Namespace:" label-for="namespace">
                        <b-form-input
                           id="namespace"
                           v-model="namespace"
                           required
                           placeholder="Enter namespaces"
                        ></b-form-input>
                     </b-form-group>
                  </b-col>
                  <b-col>
                     <b-form-group
                        id="input-group-2"
                        label="Pipeline Block Name:"
                        label-for="blockName"
                     >
                        <b-form-input
                           id="blockName"
                           v-model="blockName"
                           required
                           placeholder="Enter the name for the block"
                        ></b-form-input>
                     </b-form-group>
                  </b-col>
               </b-row>
            </b-form>
         </div>
         <div>
            <h5>Pipeline Block</h5>
            <div class="bd-clipboard">
               <b-button
                  class="btn-clipboard"
                  v-b-tooltip.hover
                  title="Copy to clipboard"
                  v-clipboard:copy="pipelineBlockCode"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
               >Copy</b-button>
            </div>
            <pre id="pipelinecode" v-highlightjs="pipelineBlockCode"><code class="c#"></code></pre>
         </div>

         <div>
            <h5>Configure Sitecore</h5>
            <div class="bd-clipboard">
               <b-button
                  class="btn-clipboard"
                  v-b-tooltip.hover
                  title="Copy to clipboard"
                  v-clipboard:copy="configureSitecoreCode"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
               >Copy</b-button>
            </div>
            <pre v-highlightjs="configureSitecoreCode"><code class="c#"></code></pre>
         </div>
         <div slot="modal-footer">
            <b-button
               variant="primary"
               size="sm"
               class="float-right btn-danger"
               @click="show=false"
            >Close</b-button>
         </div>
      </b-modal>
   </div>
</template>

<script>
import { prettyClrType } from "../../filters/clrTypes";
import doT from "dot";
import axios from "axios";

import Block from "./Block";

export default {
   name: "Pipeline",
   props: ["pipeline"],
   data() {
      return {
         show: false,
         blocks: [],
         addBefore: false,
         pipelineBlock: "",
         namespace: "Plugin.Commerce",
         blockName: "PipelineBlockName",
         sourcecode: 'const str = "This sourcecode will update dynamically"',
         blockCodeTemplate: "",
         configureBlockCodeTemplate: ""
      };
   },
   watch: {
      namespace: function(newNamespace) {
         this.$cookie.set("pipelineBlockNamespace", newNamespace);
      }
   },
   filters: {
      prettyClrType
   },
   components: {
      Block
   },
   computed: {
      pipelines: function() {
         if (this.$store) {
            return this.$store.state.pipelines;
         } else {
            return [];
         }
      },
      pipelineBlockCode: function() {
         if (this.pipelineBlock) {
            var pipelineBlockData = {
               namespace: this.namespace,
               blockName: this.blockName,
               receives: prettyClrType(this.pipelineBlock.Returns),
               returns: prettyClrType(this.pipelineBlock.Returns)
            };

            var template = doT.template(this.blockCodeTemplate);
            return template(pipelineBlockData);
         } else {
            return "";
         }
      },
      configureSitecoreCode: function() {
         if (this.pipelineBlock) {
            var configurePipelineBlockData = {
               namespace: this.namespace,
               pipelineName: this.pipeline.Name,
               blockName: this.blockName,
               addBefore: this.addBefore,
               receives: prettyClrType(this.pipelineBlock.Returns),
               returns: prettyClrType(this.pipelineBlock.Returns),
               afterBlockName: this.pipelineBlock.Name
            };

            var template = doT.template(this.configureBlockCodeTemplate);
            return template(configurePipelineBlockData);
         } else {
            return "";
         }
      }
   },
   created() {
      var namespace = this.$cookie.get("pipelineBlockNamespace");
      if (namespace) {
         this.namespace = namespace;
      }

      doT.templateSettings = {
         evaluate: /\{\{([\s\S]+?)\}\}/g,
         interpolate: /\{\{=([\s\S]+?)\}\}/g,
         encode: /\{\{!([\s\S]+?)\}\}/g,
         use: /\{\{#([\s\S]+?)\}\}/g,
         define: /\{\{##\s*([\w.$]+)\s*(:|=)([\s\S]+?)#\}\}/g,
         conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
         iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*:\s*([\w$]+)\s*(?::\s*([\w$]+))?\s*\}\})/g,
         varname: "it",
         strip: false,
         append: true,
         selfcontained: false
      };
      axios.get("/templates/pipelineblock.template").then(response => {
         this.blockCodeTemplate = response.data;
      });
      axios
         .get("/templates/configure-pipelineblock.template")
         .then(response => {
            this.configureBlockCodeTemplate = response.data;
         });
   },
   beforeUpdate() {
      if (this.pipeline) {
         this.blocks = this.pipeline.blocks;
      }
   },
   methods: {
      prettyClrType: function(type) {
         return prettyClrType(type);
      },
      isBlockPipeline: function(block) {
         var pipeline = this.$store.getters.getPipeline(
            `${block.Namespace}.${block.Name}`
         );
         return pipeline;
      },
      sendInfo(block, addBefore = false) {
         this.addBefore = addBefore;
         this.pipelineBlock = block;
      },
      onCopy: function() {},
      onError: function() {
         alert("Failed to copy texts");
      },
      getPipelineName: pipeline => {
         return `${pipeline.Namespace}.${pipeline.Name}`;
      }
   }
};
</script>

<style>
#pipelinecode {
   height: 300px;
}

img {
   vertical-align: middle;
}

.img-responsive {
   display: block;
   height: auto;
   max-width: 100%;
}

.img-rounded {
   border-radius: 3px;
}

.img-thumbnail {
   background-color: #fff;
   border: 1px solid #ededf0;
   border-radius: 3px;
   display: inline-block;
   height: auto;
   line-height: 1.428571429;
   max-width: 100%;
   moz-transition: all 0.2s ease-in-out;
   o-transition: all 0.2s ease-in-out;
   padding: 2px;
   transition: all 0.2s ease-in-out;
   webkit-transition: all 0.2s ease-in-out;
}

.img-circle {
   border-radius: 50%;
}

.timeline-centered {
   position: relative;
   margin-bottom: 30px;
}

.timeline-centered:before,
.timeline-centered:after {
   content: " ";
   display: table;
}

.timeline-centered:after {
   clear: both;
}

.timeline-centered:before,
.timeline-centered:after {
   content: " ";
   display: table;
}

.timeline-centered:after {
   clear: both;
}

.timeline-centered:before {
   content: "";
   position: absolute;
   display: block;
   width: 4px;
   background: #f5f5f6;
   /*left: 50%;*/
   top: 20px;
   bottom: 20px;
   margin-left: 30px;
}

.timeline-centered .timeline-entry {
   position: relative;
   /*width: 50%;
        float: right;*/
   margin-top: 5px;
   margin-left: 30px;
   margin-bottom: 10px;
   clear: both;
}

.timeline-centered .timeline-entry:before,
.timeline-centered .timeline-entry:after {
   content: " ";
   display: table;
}

.timeline-centered .timeline-entry:after {
   clear: both;
}

.timeline-centered .timeline-entry:before,
.timeline-centered .timeline-entry:after {
   content: " ";
   display: table;
}

.timeline-centered .timeline-entry:after {
   clear: both;
}

.timeline-centered .timeline-entry.start .timeline-entry-inner .timeline-label,
.timeline-centered
   .timeline-entry.finish
   .timeline-entry-inner
   .timeline-label {
   background-color: #fafafa;
}

.timeline-centered
   .timeline-entry.start
   .timeline-entry-inner
   .timeline-label
   h2,
.timeline-centered
   .timeline-entry.finish
   .timeline-entry-inner
   .timeline-label
   h2 {
   color: #a0a0a0;
}

.timeline-centered .timeline-entry.left-aligned {
   float: left;
}

.timeline-centered .timeline-entry.left-aligned .timeline-entry-inner {
   margin-left: 0;
   margin-right: -18px;
}

.timeline-centered
   .timeline-entry.left-aligned
   .timeline-entry-inner
   .timeline-time {
   left: auto;
   right: -100px;
   text-align: left;
}

.timeline-centered
   .timeline-entry.left-aligned
   .timeline-entry-inner
   .timeline-icon {
   float: right;
}

.timeline-centered
   .timeline-entry.left-aligned
   .timeline-entry-inner
   .timeline-label {
   margin-left: 0;
   margin-right: 70px;
}

.timeline-centered
   .timeline-entry.left-aligned
   .timeline-entry-inner
   .timeline-label:after {
   left: auto;
   right: 0;
   margin-left: 0;
   margin-right: -9px;
   -moz-transform: rotate(180deg);
   -o-transform: rotate(180deg);
   -webkit-transform: rotate(180deg);
   -ms-transform: rotate(180deg);
   transform: rotate(180deg);
}

.timeline-centered .timeline-entry .timeline-entry-inner {
   position: relative;
   margin-left: -20px;
}

.timeline-centered .timeline-entry .timeline-entry-inner:before,
.timeline-centered .timeline-entry .timeline-entry-inner:after {
   content: " ";
   display: table;
}

.timeline-centered .timeline-entry .timeline-entry-inner:after {
   clear: both;
}

.timeline-centered .timeline-entry .timeline-entry-inner:before,
.timeline-centered .timeline-entry .timeline-entry-inner:after {
   content: " ";
   display: table;
}

.timeline-centered .timeline-entry .timeline-entry-inner:after {
   clear: both;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-time {
   position: absolute;
   left: -100px;
   text-align: right;
   padding: 10px;
   -webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
   box-sizing: border-box;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-time > span {
   display: block;
}

.timeline-centered
   .timeline-entry
   .timeline-entry-inner
   .timeline-time
   > span:first-child {
   font-size: 15px;
   font-weight: bold;
}

.timeline-centered
   .timeline-entry
   .timeline-entry-inner
   .timeline-time
   > span:last-child {
   font-size: 12px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon {
   background: #fff;
   color: #737881;
   display: block;
   width: 40px;
   height: 40px;
   -webkit-background-clip: padding-box;
   -moz-background-clip: padding;
   background-clip: padding-box;
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius: 20px;
   text-align: center;
   -moz-box-shadow: 0 0 0 5px #f5f5f6;
   -webkit-box-shadow: 0 0 0 5px #f5f5f6;
   box-shadow: 0 0 0 5px #f5f5f6;
   line-height: 40px;
   font-size: 15px;
   float: left;
}

.timeline-centered
   .timeline-entry
   .timeline-entry-inner
   .timeline-icon.bg-primary {
   background-color: #303641;
   color: #fff;
}

.timeline-centered
   .timeline-entry
   .timeline-entry-inner
   .timeline-icon.bg-secondary {
   background-color: #ee4749;
   color: #fff;
}

.timeline-centered
   .timeline-entry
   .timeline-entry-inner
   .timeline-icon.bg-success {
   background-color: #00a651;
   color: #fff;
}

.timeline-centered
   .timeline-entry
   .timeline-entry-inner
   .timeline-icon.bg-info {
   background-color: #21a9e1;
   color: #fff;
}

.timeline-centered
   .timeline-entry
   .timeline-entry-inner
   .timeline-icon.bg-warning {
   background-color: #fad839;
   color: #fff;
}

.timeline-centered
   .timeline-entry
   .timeline-entry-inner
   .timeline-icon.bg-danger {
   background-color: #cc2424;
   color: #fff;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label {
   position: relative;
   background: #f5f5f6;
   padding: 1em;
   margin-left: 60px;
   -webkit-background-clip: padding-box;
   -moz-background-clip: padding;
   background-clip: padding-box;
   -webkit-border-radius: 3px;
   -moz-border-radius: 3px;
   border-radius: 10px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label:after {
   content: "";
   display: block;
   position: absolute;
   width: 0;
   height: 0;
   border-style: solid;
   border-width: 10px 10px 10px 0;
   border-color: transparent #f5f5f6 transparent transparent;
   left: 0;
   top: 10px;
   margin-left: -10px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2,
.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h3,
.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p {
   color: #737881;
   margin: 0;
   font-weight: 800;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p + p {
   margin-top: 15px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 {
   color: black;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h3 {
   color: black;
   margin-bottom: 10px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 a,
.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h3 a {
   color: #303641;
}

.timeline-centered
   .timeline-entry
   .timeline-entry-inner
   .timeline-label
   h2
   span {
   -webkit-opacity: 0.6;
   -moz-opacity: 0.6;
   opacity: 0.6;
   -ms-filter: alpha(opacity=60);
   filter: alpha(opacity=60);
   -webkit-border-radius: 8px;
   -moz-border-radius: 8px;
   border-radius: 8px;
}

.start .timeline-entry-inner .timeline-label {
   background-color: #f0f4c3 !important;
}

.finish .timeline-entry-inner .timeline-label {
   background-color: #c5e1a5 !important;
}

.timeline-entry-inner .timeline-label {
   background-color: #aed581 !important;
}

.timeline-entry-inner .timeline-label.pipeline {
   background-color: #fff59d !important;
}

.timeline-entry-inner .timeline-label:after {
   border-color: transparent #aed581 transparent transparent !important;
}

.start .timeline-entry-inner .timeline-label:after {
   border-color: transparent #f0f4c3 transparent transparent !important;
}

.finish .timeline-entry-inner .timeline-label:after {
   border-color: transparent #c5e1a5 transparent transparent !important;
}

.timeline-entry-inner .timeline-label.pipeline:after {
   border-color: transparent #fff59d transparent transparent !important;
}

.timeline-code {
   margin-left: 60px;
   margin-top: 4px;
   color: black;
}

.timeline-code .fa-chevron-right {
   margin-right: 3px;
}

.timeline-code .fa-scroll {
   color: #c5e1a5;
}

.bd-clipboard {
   position: relative;
   float: right;
}

.bd-clipboard + .highlight {
   margin-top: 0;
}

.btn-clipboard {
   position: absolute;
   top: -2rem;
   right: 0.5rem;
   z-index: 10;
   display: block;
   padding: 0.25rem 0.5rem;
   font-size: 75%;
   color: #818a91;
   cursor: pointer;
   background-color: transparent;
   border: 0;
   border-radius: 0.25rem;
}

.btn-clipboard:hover {
   color: #fff;
   background-color: #d50000;
}

.timeline-label {
   background-color: red;
}
</style>