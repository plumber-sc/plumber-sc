<template>
   <b-modal id="settingsModal" title="Plumber Settings" size="lg" @show="showModal">
      <p class="my-4">
         <b-form>
            <b-form-group label="Engine url:" label-for="engineUrlInput">
               <b-form-input
                  id="engineUrlInput"
                  v-model="engineUrl"
                  type="text"
                  required
                  placeholder="Enter url for the engine e.g. https://localhost:5000"
               ></b-form-input>
            </b-form-group>
            <b-form-group label="Identity Server Url:" label-for="identityServerUrlInput">
               <b-form-input
                  id="identityServerUrlInput"
                  v-model="identityServerUrl"
                  type="text"
                  required
                  placeholder="Enter url for Identity Server e.g. https://localhost:5050"
               ></b-form-input>
            </b-form-group>
            <b-form-group
               label="Identity Server Client ID:"
               label-for="identityServerClientIdInput"
            >
               <b-form-input
                  id="identityServerClientIdInput"
                  v-model="identityServerClientId"
                  type="text"
                  required
                  placeholder="Enter client id to use with Identity Server e.g. 'Plumber'"
               ></b-form-input>
            </b-form-group>
         </b-form>
      </p>

      <div slot="modal-footer">
         <b-button variant="danger" size="sm" @click="saveConfig">Save</b-button>&nbsp;
         <b-button variant="outline-secondary" size="sm" @click="cancelConfig">Cancel</b-button>
      </div>
   </b-modal>
</template>

<script>
import deepEqual from "deep-equal";

export default {
   props: [],
   data: function() {
      return {
         engineUrl: "https://localhost:5000",
         identityServerUrl: "https://localhost:8080",
         identityServerClientId: "Plumber"
      };
   },
   mounted() {},
   methods: {
      showModal() {
         this.engineUrl = this.$store.state.config.EngineUri;
         this.identityServerUrl = this.$store.state.config.IdentityServerUri;
         this.identityServerClientId = this.$store.state.config.ClientId;
      },
      saveConfig() {
         var config = {};
         config.EngineUri = this.engineUrl;
         config.IdentityServerUri = this.identityServerUrl;
         config.ClientId = this.identityServerClientId;

         if (!deepEqual(config, this.$store.state.config)) {
            this.$store.commit("setConfig", config);
            this.$store.dispatch("initData");
            this.$bus.$emit("reload");
         }

         this.$root.$emit("bv::hide::modal", "settingsModal");
      },
      cancelConfig() {
         this.$root.$emit("bv::hide::modal", "settingsModal");
      }
   }
};
</script>

<style>
</style>