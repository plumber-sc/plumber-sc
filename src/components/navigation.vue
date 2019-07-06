<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a href="/" class="logo">
        <img v-b-tooltip.hover :title="'Plumber: version '+version" src="/logo.png" width="64px" />
        <span>Plumber</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <transition name="fade">
        <div class="collapse navbar-collapse" id="navbarNav" v-if="showNavigation">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <router-link
                :to="{ name: 'pipelines'}"
                class="nav-link"
                active-class="active"
              >Pipelines</router-link>
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
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <b-link v-b-modal.settingsModal class="nav-link">Settings</b-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
import _ from "underscore";

export default {
  props: {
    showNavigation: Boolean,
    version: {
      type: String,
      default: ""
    }
  },
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

a.logo {
  font-family: "Lobster", cursive;
  font-size: 34px;
  text-decoration: none;
  color: #212121;
}

a.logo span {
  margin-left: 6px;
}

.nav-link {
  color: #d50000;
}

.nav-link:hover {
  color: #212121;
}

.active {
  background-color: #d50000 !important;
}

#navbarNav {
  margin-left: 24px;
}
</style>
