<template>
  <div id="app" class="container">
    <navigation></navigation>
    <b-row>
      <b-col cols="12">
        <authenticate></authenticate>
        <div v-if="!finishedLoading && !connectionError" class="alert alert-info" role="alert">
          <strong>Initializing...</strong>
          <div v-for="message in loadMessages">
            {{ message }}
          </div>
        </div>
        <div v-if="connectionError" class="alert alert-danger" role="alert">
          <strong>Oh snap!</strong> Change a few things up and try submitting again.
        </div>
        <keep-alive>
          <router-view v-if="loggedIn && finishedLoading" />
        </keep-alive>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-snotify/styles/material.css";

import Navigation from "./components/navigation";
import xml2js from "xml2js";
import _ from "underscore";

import axios from "axios";
import sortJsonArray from "sort-json-array";

import Authenticate from "@/components/Authenticate.vue";

export default {
  name: "app",
  computed: {
    startedLoading: function() {
      return this.$store.state.startedLoading;
    },
    finishedLoading: function() {
      return this.$store.state.finishedLoading;
    },
    connectionError: function() {
      return this.$store.state.connectionError;
    },
    loadMessages: function() {
      return this.$store.state.loadMessages;
    },
    loggedIn: function() {
      return this.$store.state.token;
    }
  },
  components: {
    Navigation,
    Authenticate
  },
  created() {},
  mounted() {
    //this.initData(this.$store.state.config);
    if (
      !this.$store.token &&
      this.$route.path != "/auth/callback" &&
      !this.$store.state.startedLoading
    ) {
      this.authenticate();
    } else if (this.$route.path != "/auth/callback") {
      this.$store.dispatch("initData");
    }
  },
  methods: {
    authenticate: function() {
      window.location =
        "http://localhost:5050/connect/authorize?response_type=id_token%20token&client_id=Plumber&redirect_uri=http://localhost:8080/auth/callback&scope=openid%20EngineAPI&nonce=vueauth-1515618726734";
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 100px;
  font-family: Helvetica Neue LT, Helvetica Neue, Helvetica, Arial, sans-serif;
}

input.typeahead {
  width: 100%;
}

span.twitter-typeahead .tt-menu,
span.twitter-typeahead .tt-dropdown-menu {
  cursor: pointer;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}
span.twitter-typeahead .tt-suggestion {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333333;
  white-space: nowrap;
}
span.twitter-typeahead .tt-suggestion.tt-cursor,
span.twitter-typeahead .tt-suggestion:hover,
span.twitter-typeahead .tt-suggestion:focus {
  color: #ffffff;
  text-decoration: none;
  outline: 0;
  background-color: #337ab7;
}
.input-group.input-group-lg span.twitter-typeahead .form-control {
  height: 46px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
.input-group.input-group-sm span.twitter-typeahead .form-control {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
span.twitter-typeahead {
  width: 100%;
}
.input-group span.twitter-typeahead {
  display: block !important;
  height: 34px;
}
.input-group span.twitter-typeahead .tt-menu,
.input-group span.twitter-typeahead .tt-dropdown-menu {
  top: 32px !important;
}
.input-group
  span.twitter-typeahead:not(:first-child):not(:last-child)
  .form-control {
  border-radius: 0;
}
.input-group span.twitter-typeahead:first-child .form-control {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group span.twitter-typeahead:last-child .form-control {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.input-group.input-group-sm span.twitter-typeahead {
  height: 30px;
}
.input-group.input-group-sm span.twitter-typeahead .tt-menu,
.input-group.input-group-sm span.twitter-typeahead .tt-dropdown-menu {
  top: 30px !important;
}
.input-group.input-group-lg span.twitter-typeahead {
  height: 46px;
}
.input-group.input-group-lg span.twitter-typeahead .tt-menu,
.input-group.input-group-lg span.twitter-typeahead .tt-dropdown-menu {
  top: 46px !important;
}

h1,
h2,
h3 {
  font-weight: 700;
  letter-spacing: -0.4px;
}

h1 {
  color: #212121;
}
</style>
