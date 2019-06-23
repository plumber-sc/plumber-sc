<template>
<div class="blocks">
    <h1>Blocks <small class="text-muted">({{ blocks.length}} blocks found)</small></h1>
    <b-row>
        <b-col>
            <vue-bootstrap-typeahead v-model="selectedBlockName" :serializer="s => s.name" :data="blockNames" @hit="hit($event)" placeholder="Start typing to search for any text in the blocks">
                <template slot="suggestion" slot-scope="{ data, htmlText }">
                    <div>
                        <span v-html="htmlText"></span> in
                        <span v-html="data.namespace"></span>
                    </div>
                </template>
            </vue-bootstrap-typeahead>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <Block v-bind:blockname="selectedBlockName" context="block"></Block>
        </b-col>
    </b-row>
</div>
</template>

<script>
import Router from '../router';
import _ from "underscore";

import Block from "./Partials/Block";

export default {
    name: "Blocks",
    props: ["blockname"],
    data() {
        return {
            selectedBlockName: null
        };
    },
    computed: {
        blockNames: function () {
            return _.map(this.$store.state.blocks, function (block) {
                return {
                    name: block.Name,
                    namespace: block.Namespace
                }
            })
        },
        blocks: function () {
            return this.$store.state.blocks;
        }
    },
    created() {},
    components: {
        Block
    },
    mounted() {
        this.selectedBlockName = this.blockname;
    },
    activated() {
        this.selectedBlockName = this.blockname;
    },
    beforeRouteUpdate(to, from, next) {
        if (to.params) {
            this.selectedBlockName = to.params.blockname;
        }
        next();
    },
    beforeUpdate() {
    },
    methods: {
        selectBlock: function (suggestion) {
            this.$router.push({
                name: "blocks",
                params: {
                    blockname: suggestion
                }
            });
        },
        hit: function (block) {
            var selectedBlockName = `${block.namespace}.${block.name}`;
            Router.push(`/blocks/${selectedBlockName}`);

        }
    }
};
</script>

<style>
#blocksdropdown {
    width: 100%;
}

#blocksearch .typeahead__list {
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
}

</style>