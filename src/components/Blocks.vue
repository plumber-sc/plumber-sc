<template>
   <div class="blocks">
      <h1 v-if="!selectedBlockName">
         Blocks
         <small class="text-muted">({{ blocks.length}} blocks found)</small>
      </h1>
      <b-row v-if="!selectedBlockName">
         <b-col>
            <b-form-input v-model="filter" placeholder="Start typing to filter blocks"></b-form-input>
            <div class="filterlist">
               <div v-for="letter in allLetters()" v-bind:key="letter">
                  <div class="letter">{{letter}}</div>
                  <div
                     v-for="block in selectedBlocks(letter)"
                     v-bind:key="`${block.Namespace}.${block.Name}`"
                  >
                     <small>{{block.Namespace}}</small>
                     <br />
                     <router-link
                        :to="{ name: 'blocks', params: { blockname: `${block.Namespace}.${block.Name}` }}"
                     >{{ block.Name }}</router-link>
                  </div>
               </div>
            </div>
         </b-col>
      </b-row>
      <b-row class="mt-3">
         <b-col>
            <div class="back-link">
               <router-link :to="{ name: 'blocks'}">
                  <i class="fas fa-chevron-circle-left"></i> Back to all blocks
               </router-link>
            </div>
            <Block v-bind:blockname="selectedBlockName" context="block"></Block>
         </b-col>
      </b-row>
   </div>
</template>

<script>
import Router from "../router";
import { createSelector } from "reselect";

import Block from "./Partials/Block";

export default {
   name: "Blocks",
   props: ["blockname"],
   data() {
      return {
         selectedBlockName: null,
         filter: ""
      };
   },
   computed: {
      blocks: function() {
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
   beforeUpdate() {},
   methods: {
      selectBlock: function(suggestion) {
         this.$router.push({
            name: "blocks",
            params: {
               blockname: suggestion
            }
         });
      },
      hit: function(block) {
         var selectedBlockName = `${block.namespace}.${block.name}`;
         Router.push(`/blocks/${selectedBlockName}`);
      },
      selectedBlocks: function(letter) {
         return this.$store.state.blocks.filter(item => {
            if (item.Name.substr(0, 1) !== letter) return false;
            if (this.filter.length < 2) return true;
            else
               return (
                  item.Name.toLowerCase().indexOf(this.filter.toLowerCase()) >=
                  0
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
#blocksdropdown {
   width: 100%;
}

#blocksearch .typeahead__list {
   max-height: 300px;
   overflow-y: auto;
   overflow-x: hidden;
}

.filterlist {
   padding-top: 12px;
   column-count: 2;
}

.filterlist .letter {
   margin-top: 12px;
   font-weight: bold;
   border-bottom: solid 1px #d50000;
}

.back-link {
   margin-bottom: 6px;
}
</style>