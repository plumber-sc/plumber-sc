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
        <b-form-group label="Identity Server Client ID:" label-for="identityServerClientIdInput">
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
            <b-button variant="primary" size="sm" class="float-right btn-danger" @click="saveConfig">
                Save
            </b-button>
        </div>
  </b-modal>
</template>

<script>
export default {
  props: [],
  data: function() {
    return {
      engineUrl: "https://localhost:5000",
      identityServerUrl: "https://localhost:8080",
      identityServerClientId: "Plumber"
    };
  },
  mounted() {
  },
  methods: {
      showModal(e) {
          this.engineUrl = this.$store.state.config.EngineUri;
          this.identityServerUrl = this.$store.state.config.IdentityServerUri;
          this.identityServerClientId = this.$store.state.config.ClientId;
      },
    saveConfig(e) {
      alert(e);
    }
  }
};
</script>

<style>
</style>