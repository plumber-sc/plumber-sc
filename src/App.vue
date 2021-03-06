<template>
   <div id="app" class="container">
      <navigation :show-navigation="finishedLoading" :version="version"></navigation>
      <b-row>
         <b-col cols="12">
            <SettingsModal />
            <Welcome v-if="this.isFirstTime()" :config="config" :plumberUri="plumberUri" />
            <div v-if="!this.isFirstTime()">
               <authenticate></authenticate>

               <template v-if="showInitializing">
                  <div v-if="showInitializing" class="alert alert-info" role="alert">
                     <h4 class="alert-heading">Initializing...</h4>
                     <div v-for="message in loadMessages">{{ message }}</div>
                  </div>
               </template>

               <template v-else-if="authenticating">
                  <IdentityServer />
               </template>

               <template v-else-if="showIdentityServerEror">
                  <IdentityServerHelp :config="config" :plumberUri="plumberUri" />
               </template>

               <template v-else-if="connectionError">
                  <CommerceEngineHelp :config="config" :plumberUri="plumberUri" />
               </template>

               <template v-else-if="showMessage">
                  <Message :heading="messageHeading" :message="messageText" :error="errorText" />
               </template>

               <template v-else-if="missingConfig">
                  <MissingConfig />
               </template>

               <b-alert
                  v-model="showNewVersionMessage"
                  variant="info"
                  dismissible
                  @dismissed="dismissNewVersionMessage"
               >
                  <h4 class="alert-heading">There is a new version of Plumber available!</h4>

                  <ul>
                     <li>
                        <a :href="latestRelease.html_url" class="alert-link">Read about what's new</a>
                     </li>
                     <li>
                        <a
                           :href="latestRelease.html_url+'/plumber-sc.'+latestRelease.tag_name+'.zip'"
                           class="alert-link"
                        >Download the latest release</a>
                     </li>
                  </ul>
               </b-alert>

               <keep-alive>
                  <transition name="component-fade" mode="out-in">
                     <router-view v-if="loggedIn && finishedLoading && !showInitializing" />
                  </transition>
               </keep-alive>
            </div>
         </b-col>
      </b-row>
   </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import _ from "underscore";
import axios from "axios";
import GitHub from "github-api";

import Navigation from "./components/navigation";
import Authenticate from "@/components/Authenticate.vue";
import MissingConfig from "@/components/tips/MissingConfig.vue";
import IdentityServer from "@/components/messages/IdentityServer.vue";
import Message from "@/components/messages/Message.vue";
import SettingsModal from "@/components/SettingsModal.vue";
import IdentityServerHelp from "./components/messages/IdentityServer-help.vue";
import CommerceEngineHelp from "./components/messages/commerce-engine-help.vue";
import Welcome from "./components/messages/Welcome.vue";

export default {
   name: "app",
   data() {
      return {
         missingConfig: false,
         messageHeading: "",
         messageText: "",
         errorText: "",
         config: null,
         version: "",
         showNewVersionMessage: false,
         showIdentityServerEror: false,
         showCommerceEngineError: false,
         latestRelease: {}
      };
   },
   computed: {
      plumberUri: () => {
         return `${window.location.protocol}//${window.location.hostname}${
            window.location.port ? ":" + window.location.port : ""
         }`;
      },
      showMessage: function() {
         return this.messageHeading != "" && this.messageText != "";
      },
      authenticating: function() {
         return this.$store.state.authenticating;
      },
      showInitializing: function() {
         return (
            !this.finishedLoading &&
            !this.connectionError &&
            !this.missingConfig &&
            !this.authenticating &&
            !this.showIdentityServerEror &&
            !this.showMessage
         );
      },
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
      Authenticate,
      MissingConfig,
      IdentityServer,
      Message,
      SettingsModal,
      IdentityServerHelp,
      CommerceEngineHelp,
      Welcome
   },
   created() {
      var self = this;
      this.$bus.$on("reload", function() {
         self.$store.commit("setStartLoading");
         self.initializeApp();
      });

      this.$store.dispatch("initStore");
   },
   mounted() {
      if (!this.isFirstTime()) {
         this.initializeApp();
      }
   },
   methods: {
      authenticate: function() {
         if (this.config.IdentityServerUri) {
            var discoveryUrl =
               this.config.IdentityServerUri +
               "/.well-known/openid-configuration";
            axios
               .get(discoveryUrl)
               .then(() => {
                  var plumberUri =
                     `${window.location.protocol}//${window.location.hostname}` +
                     (window.location.port ? `:${window.location.port}` : ``);

                  this.$store.commit("setAuthenticating", true);
                  var identityUri = `${
                     this.config.IdentityServerUri
                  }/connect/authorize?response_type=id_token%20token&client_id=${
                     this.config.ClientId
                  }&redirect_uri=${plumberUri}/auth/callback&scope=openid%20EngineAPI&nonce=plumber-${Math.floor(
                     Date.now()
                  )}`;
                  window.location = identityUri;
               })
               .catch(error => {
                  this.showIdentityServerEror = true;
               });
         } else {
            this.showIdentityServerEror = true;
         }
      },
      isFirstTime: function() {
         return this.$cookie.get("config") == null;
      },
      dismissNewVersionMessage: function() {
         var currentDate = new Date();
         this.$cookie.set("latestRelease", this.latestRelease.tag_name);
         this.$cookie.set("notificationDate", currentDate.toJSON(), {
            expires: "1M"
         });
      },
      initializeApp: function() {
         var self = this;
         
         axios.get("/version.txt").then(response => {
            this.version = response.data;
         });

         axios
            .get("/config.json")
            .then(response => {
               this.config = self.$store.state.config;
               if (this.config == null) {
                  this.config = response.data;
               }
               // Let's do some checking
               var messages = [];
               if (!this.config.EngineUri) {
                  messages.push(
                     'You are missing the url for commerce engine. Default value is: <code>"EngineUri": "https://localhost:5000"</code>'
                  );
               }
               if (!this.config.ClientId) {
                  messages.push(
                     'You are missing the clientid for Sitecore Identity Server. Default value is: <code>"ClientId": "Plumber"</code>'
                  );
               }

               if (messages.length > 0) {
                  this.messageHeading =
                     "There are some issues with config.json...";
                  this.messageText = _.map(messages, function(message) {
                     return "<li>" + message + "</li>";
                  }).join("");
               } else {
                  if (
                     this.config.IdentityServerUri &&
                     !this.$store.token &&
                     this.$route.path != "/auth/callback" &&
                     !this.$store.state.startedLoading
                  ) {
                     this.authenticate(this.config);
                  } else if (this.$route.path != "/auth/callback") {
                     if (!this.config.IdentityServerUri) {
                        this.$store.commit("setToken", "8.2.1"); // Identity Server url has not been set so we assume this is Sitecore Commerce 8.2.1
                        this.$store.dispatch("initData");
                        this.$router.push({
                           name: "pipelines"
                        });
                     } else {
                        const gh = new GitHub();
                        let repo = gh.getRepo("plumber-sc", "plumber-sc");
                        repo.listReleases().then(response => {
                           let releases = response.data;
                           if (releases.length > 0) {
                              this.latestRelease = releases[0];
                              var latestVersion = this.latestRelease.tag_name;
                              var lastNotificationDate = this.$cookie.get(
                                 "notificationDate"
                              );
                              if (
                                 !this.version.startsWith(
                                    latestVersion + "-"
                                 ) &&
                                 !lastNotificationDate
                              ) {
                                 this.showNewVersionMessage = true;
                              }
                           }
                        });
                     }
                  }
               }
            })
            .catch(function() {
               self.missingConfig = true;
            });
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
   font-family: "Roboto Mono", monospace;
}

.fade-enter-active,
.fade-leave-active {
   transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
 {
   opacity: 0;
}

.component-fade-enter-active,
.component-fade-leave-active {
   transition: opacity 0.3s ease;
}

.component-fade-enter,
.component-fade-leave-to

/* .component-fade-leave-active below version 2.1.8 */
 {
   opacity: 0;
}
</style>


