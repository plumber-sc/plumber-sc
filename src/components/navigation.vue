<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <img src="/static/logo.png" width="64px" />
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="nav nav-pills">
          <li class="nav-item environment">
            <b-form-select v-model="selected" :options="environments" class="mb-3">
            </b-form-select>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'pipelines'}" class="nav-link" active-class="active">Pipelines</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'blocks'}" class="nav-link" active-class="active">Blocks</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'policies'}" class="nav-link" active-class="active">Policies</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'metadata'}" class="nav-link" active-class="active">Metadata</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'plugins'}" class="nav-link" active-class="active">Plugins</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import _ from "underscore";

export default {
  computed: {
    environments: function() {
      var environments = _.map(this.$store.state.environments, environment => {
        return environment.Name;
      });
      return environments;
    }
  }
};
</script>

<style>
.environment {
  margin-left: 24px;
  margin-right: 24px;
}
</style>
