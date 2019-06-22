<template>
<div class="pipelines">
    <h1>Pipelines <small class="text-muted">({{ pipelines.length}} pipelines found)</small></h1>
    <b-row>
        <b-col>
            <vue-bootstrap-typeahead v-model="selectedPipelineName" :serializer="s => s.name" :data="pipelineNames" @hit="hit($event)" placeholder="Start typing to search for any text in the pipelines">
                <template slot="suggestion" slot-scope="{ data, htmlText }">
                    <div>
                        <span v-html="htmlText"></span> &nbsp;<small>in
                          <span v-html="data.namespace"></span></small>
                    </div>
                </template>
            </vue-bootstrap-typeahead>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <pipeline v-bind:pipeline="selectedPipeline" />
        </b-col>
    </b-row>
</div>
</template>

<script>
import Pipeline from "./Pipeline";
import Router from "../router";

export default {
    name: "Pipelines",
    props: ["pipelineid"],
    data() {
        return {
            selectedPipelineName: '',
            namespaces: []
        };
    },
    computed: {
        pipelines: function () {
            return this.$store.state.pipelines;
        },
        pipelineNames: function () {
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
        selectedPipeline: function () {
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
        selectPlugin: function (suggestion) {
            var pipeline = this.pipelines.find(pipeline => {
                return `${pipeline.Namespace}.${pipeline.Name}` == suggestion;
            });
            this.$router.push(`/pipelines/${pipeline}`);
        },
        pipelineUrl: function (pipeline) {
            return `/pipelines/${pipeline.Namespace}.${pipeline.Name}`;
        },
        hit: function (event) {
            var suggestion = `${event.namespace}.${event.name}`;
            Router.push(`/pipelines/${suggestion}`);

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
</style>
