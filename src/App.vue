<template>
<div id="app" class="container">
    <navigation :show-navigation="finishedLoading"></navigation>
    <b-row>
        <b-col cols="12">
            <authenticate></authenticate>
            <transition  name="component-fade" mode="out-in">
            <div v-if="showInitializing" class="alert alert-info" role="alert">
                <h4 class="alert-heading">Initializing...</h4>
                <div v-for="message in loadMessages">
                    {{ message }}
                </div>
            </div>

            <div v-if="connectionError" class="alert alert-danger" role="alert">
                <strong>Oh snap!</strong> Something went wrong. Refresh the page, maybe it will work...
            </div>
            <IdentityServer v-if="authenticating" />
            <MissingConfig v-if="missingConfig" />
            </transition>
            <keep-alive>
              <transition name="component-fade" mode="out-in">
                <router-view v-if="loggedIn && finishedLoading && !showInitializing" />
              </transition>
            </keep-alive>
        </b-col>
    </b-row>
</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Navigation from "./components/navigation";

import axios from "axios";

import Authenticate from "@/components/Authenticate.vue"
import MissingConfig from "@/components/tips/MissingConfig.vue"
import IdentityServer from '@/components/messages/IdentityServer.vue'

export default {
    name: "app",
    data() {
        return {
            missingConfig: false
        };
    },
    computed: {
        authenticating: function () {
          return this.$store.state.authenticating;
        },
        showInitializing: function () {
          return !this.finishedLoading && !this.connectionError && !this.missingConfig && !this.authenticating
        },
        startedLoading: function () {
            return this.$store.state.startedLoading;
        },
        finishedLoading: function () {
            return this.$store.state.finishedLoading;
        },
        connectionError: function () {
            return this.$store.state.connectionError;
        },
        loadMessages: function () {
            return this.$store.state.loadMessages;
        },
        loggedIn: function () {
            return this.$store.state.token;
        }
    },
    components: {
        Navigation,
        Authenticate,
        MissingConfig,
        IdentityServer
    },
    created() {
        this.$store.dispatch("initConfig");
    },
    mounted() {
        var self = this;
        axios
            .get("/config.json")
            .then(response => {
                var config = response.data;
                if (
                    response.data.IdentityServerUri &&
                    !this.$store.token &&
                    this.$route.path != "/auth/callback" &&
                    !this.$store.state.startedLoading
                ) {
                    this.authenticate(response.data);
                } else if (this.$route.path != "/auth/callback") {
                    if (!response.data.IdentityServerUri) {
                        this.$store.commit("setToken", "8.2.1");
                        this.$store.dispatch("initData");
                        this.$router.push({
                            name: "pipelines"
                        });
                    }
                }
            })
            .catch(function (error) {
                self.missingConfig = true;
                console.log(error);
            });
    },
    methods: {
        authenticate: function (config) {
            if (config.IdentityServerUri) {
                this.$store.commit("setAuthenticating", true);
                var identityUri = `${config.IdentityServerUri}/connect/authorize?response_type=id_token%20token&client_id=${config.ClientId}&redirect_uri=${config.PlumberUri}/auth/callback&scope=openid%20EngineAPI&nonce=plumber-${Math.floor(Date.now())}`;
                window.location = identityUri;
            }
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
    margin-bottom: 60px;
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

.code {
    font-family: 'Roboto Mono', monospace;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
