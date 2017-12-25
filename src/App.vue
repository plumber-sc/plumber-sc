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

export default {
  name: "app",
  components: {
    Navigation
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
